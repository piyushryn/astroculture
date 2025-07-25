import { Router } from "express";

import { checkValidUser } from "../middlewares/auth.js";
import {
  getTodaysHoroscope,
  getHoroscopeHistory,
} from "../controllers/horoscope.js";

const horoscopeRoutes = Router();

horoscopeRoutes.use(checkValidUser);

/**
 * @swagger
 * /horoscope/today:
 *   get:
 *     summary: Get today's horoscope
 *     description: Retrieve or generate today's horoscope for the authenticated user based on their zodiac sign
 *     tags: [Horoscope]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Today's horoscope retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Horoscope'
 *                     message:
 *                       example: "Today's horoscope retrieved successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
horoscopeRoutes.get("/today", getTodaysHoroscope);

/**
 * @swagger
 * /horoscope/history:
 *   get:
 *     summary: Get horoscope history
 *     description: Retrieve horoscope history for the authenticated user for the specified number of days
 *     tags: [Horoscope]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 7
 *           minimum: 1
 *           maximum: 30
 *         description: "Number of days to retrieve horoscope history for (default: 7, max: 30)"
 *         example: 7
 *     responses:
 *       200:
 *         description: Horoscope history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Horoscope'
 *                     message:
 *                       example: "Horoscope history retrieved successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
horoscopeRoutes.get("/history", getHoroscopeHistory);

export default horoscopeRoutes;
