import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  "/api/resume",
  resumeRoutes,
);

app.use(
  "/api/ai",
  aiRoutes,
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` 🚀Server Running on Port ${PORT}`);
});