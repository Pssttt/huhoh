import db from "../lib/db.js";
import { hash, compare } from "bcryptjs";
const findByEmail = async (email: String) => {
  const mail = await db.user.findUnique({
    where: { email },
  });
  return mail;
};

const findByUsername = async (username: String) => {
  const account = await db.user.findUnique({
    where: { username },
  });
  return account;
};

const findById = async (id: String) => {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
};

const createUser = async (
  userName: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hash(password, 10);
  const user = await db.user.create({
    data: {
      userName: userName,
      email: email,
      password: hashedPassword,
    },
  });
  return user;
};

const getUserInfo = async (id: String) => {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      username: true,
      profilePic: true,
    },
  });
  return user;
};

const validatePassword = async (input: String, hash: String) => {
  return compare(input, hash);
};
