import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { cors } from "hono/cors";
import { mainRouter } from "./routes/index.ts";
import db from "./lib/db.ts";

dotenv.config();

const app = new Hono();

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || "http://localhost:5173"
).split(",");

app.use(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }),
);

app.route("", mainRouter);

app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000,
  });
});

const port = parseInt(process.env.PORT || "3000");

serve(
  {
    fetch: app.fetch,
    port: port,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server is running on port ${info.port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  },
);

process.on("beforeExit", async () => {
  console.log("Shutting down gracefully...");
  await db.$disconnect();
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await db.$disconnect();
  process.exit(0);
});
