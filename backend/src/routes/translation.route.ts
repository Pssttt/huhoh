import { Hono } from "hono";
import * as translationController from "../controllers/translation.controller.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const translationRouter = new Hono();

translationRouter.use(verifyAuth);

translationRouter.post("/ZtoEn", translationController.createTranslation);
translationRouter.post("/save/:id", translationController.saveTranslation);
translationRouter.delete(
  "/delete/:id",
  translationController.deleteTranslation
);

export { translationRouter };
