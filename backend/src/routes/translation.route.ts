import { Hono } from "hono";
import * as translationController from "../controllers/translation.controller.js";

const translationRouter = new Hono();

export { translationRouter };
