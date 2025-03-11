import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as db from "./db.js";
import { AppRouter } from "./routes/AppRouter.js";
import { pathErrorHandler } from "./utils/pathErrorHandler.js";
import { errorMiddleware } from "./utils/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("/admin", cors());
const port = process.env.PORT;
await db.connect();

app.use("/", AppRouter);

app.use(pathErrorHandler);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
