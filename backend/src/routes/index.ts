import { Hono } from "hono";
import { userRouter } from "./user.route.js";
import { translationRouter } from "./translation.route.js";

const mainRouter = new Hono();

mainRouter.route("/auth", userRouter);
mainRouter.route("/translations", translationRouter);

export { mainRouter };
