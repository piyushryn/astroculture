import { Router } from "express";

import { checkValidUser } from "../middlewares/auth.js";
import {
  getTodaysHoroscope,
  getHoroscopeHistory,
} from "../controllers/horoscope.js";

const horoscopeRoutes = Router();

horoscopeRoutes.use(checkValidUser);
horoscopeRoutes.get("/today", getTodaysHoroscope);
horoscopeRoutes.get("/history", getHoroscopeHistory);

export default horoscopeRoutes;
