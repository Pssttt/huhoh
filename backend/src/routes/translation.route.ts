import { Hono } from "hono";
import { translate } from "../utils/translation.js";

const translationRouter = new Hono();
translationRouter.route("/", translate);
export { translationRouter };
