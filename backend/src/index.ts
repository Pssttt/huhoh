import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { cors } from "hono/cors";
import { mainRouter } from "./routes/index.js";
dotenv.config();

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("", mainRouter);

app.use(
  "*",
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  })
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
