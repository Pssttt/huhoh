import type { Context } from "hono";
import * as userModel from "../models/user.model.js";
import type { CreateUserBody } from "../types/index.ts";
// import cloudinary from "cloudinary";

const createUser = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json<CreateUserBody>();
    if (!username || !email || !password) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    }

    const userByEmail = await userModel.findByEmail(email);

    if (userByEmail) {
      return c.json({
        success: false,
        data: null,
        msg: "Email already exists",
      });
    }

    const userByName = await userModel.findByUsername(username);

    if (userByName) {
      return c.json({
        success: false,
        data: null,
        msg: "Username already exists",
      });
    }

    const newUser = await userModel.createUser(username, email, password);

    const { password: _, ...safeUser } = newUser;

    return c.json({
      success: true,
      data: safeUser,
      msg: "Created new user!",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

const signInUser = async (c: Context) => {
  try {
    const { email, username, password } = await c.req.json();
    const user = await userModel.findByEmail(email);

    if (!user) {
      return c.json(
        { success: false, data: null, msg: "Email doesn't exist" },
        401
      );
    }

    const isValid = await userModel.validatePassword(password, user.password);
    if (!isValid) {
      return c.json(
        { success: false, data: null, msg: "Invalid credentials" },
        401
      );
    }
  } catch (err) {
    console.error(err);
  }
};

const updateProfile = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ success: false, msg: "Unauthorized" }, 401);
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return c.json({ success: false, msg: "User not found" }, 404);
    }

    const formData = await c.req.formData();
    const username = formData.get("username") as string;
    const password = formData.get("newPassword") as string;
    const profilePic = formData.get("profilePic") as File;

    const updateData: any = {};

    if (username) {
      const existingUser = await userModel.findByUsername(username);
      if (existingUser && existingUser.id !== userId) {
        return c.json({ success: false, msg: "Username already exists" }, 400);
      }
      updateData.username = username;
    }

    if (password) {
      const isValid = await userModel.validatePassword(password, user.password);
      if (!isValid) {
        return c.json(
          { success: false, data: null, msg: "Invalid credentials" },
          401
        );
      }
      updateData.password = password;
    }

    if (profilePic instanceof File) {
      const buffer = await profilePic.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const dataUri = `data:${profilePic.type};base64,${base64Image}`;

      // const uploaded = await cloudinary.uploader.upload(dataUri, {
      //   folder: "",
      // });

      // updateData.profilePic = uploaded.secure_url;
    }

    const updatedUser = await userModel.updateUser(userId, updateData);
    return c.json({
      success: true,
      data: updatedUser,
      msg: "Profile updated successfully",
    });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, msg: "Failed to update profile" }, 500);
  }
};

export { createUser };
