import cors from "cors";
import connectDB from "./connections/db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger.js";
import authRoutes from "./routes/auth.js";
import horoscopeRoutes from "./routes/horoscope.js";
import rateLimiter from "./middlewares/ratelimit.js";
import { errorResponse, successResponse } from "./utils/apiResponse.js";

dotenv.config();

const app = express();

connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Astroculture API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
    },
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/horoscope", horoscopeRoutes);

// Global handlers
app.get("/", (req, res) => {
  res.redirect("/health");
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check if the API is running and healthy
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           example: "Hello from Astroculture API 🚀"
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                           example: "healthy"
 *                     message:
 *                       example: "API is running successfully"
 */
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
