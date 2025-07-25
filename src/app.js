import cors from "cors";
import connectDB from "./connections/db.js";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

console.log(process.env.DB_NAME);
const app = express();

connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);

// Global handlers
app.get("/", (req, res) => {
  res.redirect("/health");
});

app.get("/health", (req, res) => {
  res.send("Hello from Astroculture API 🚀");
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

export default app;
