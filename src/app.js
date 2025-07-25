import cors from "cors";
import connectDB from "./connections/db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import horoscopeRoutes from "./routes/horoscope.js";
import rateLimiter from "./middlewares/ratelimit.js";
import { errorResponse, successResponse } from "./utils/apiResponse.js";

dotenv.config();

console.log(process.env.DB_NAME);
const app = express();

connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

// Routes
app.use("/auth", authRoutes);
app.use("/horoscope", horoscopeRoutes);

// Global handlers
app.get("/", (req, res) => {
  res.redirect("/health");
});

app.get("/health", (req, res) => {
  return successResponse(
    res,
    {
      message: "Hello from Astroculture API 🚀",
      timestamp: new Date().toISOString(),
      status: "healthy",
    },
    "API is running successfully"
  );
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  return errorResponse(res, "Internal server error", 500, error);
});

export default app;
