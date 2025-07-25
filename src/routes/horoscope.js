import { Router } from "express";

import { checkValidUser } from "../middlewares/auth.js";
import { getTodaysHoroscope } from "../controllers/horoscope.js";

const horoscopeRoutes = Router();

horoscopeRoutes.use(checkValidUser);
horoscopeRoutes.get("/today", getTodaysHoroscope);

export default horoscopeRoutes;
