import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { cors } from "hono/cors";
import { mainRouter } from "./routes/index.ts";
import db from "./lib/db.ts";
dotenv.config();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "https://huhoh.up.railway.app",
    credentials: true,
  }),
);

app.route("", mainRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

process.on("beforeExit", async () => {
  await db.$disconnect();
});
