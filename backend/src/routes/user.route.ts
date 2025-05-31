import { Hono } from "hono";
import * as userController from "../controllers/user.controller.js";

const userRouter = new Hono();

userRouter.post("/signup", userController.createUser);

export { userRouter };
