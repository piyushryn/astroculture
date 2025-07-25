import { errorResponse } from "../utils/apiResponse.js";
import dotenv from "dotenv";

dotenv.config();

const rateLimitWindowMs = 60 * 1000 * +process.env.RATE_LIMIT_WINDOW_IN_MINUTES;
const maxRequestsPerWindow = +process.env.RATE_LIMIT_MAX_REQUESTS;

// In-memory store: Map<ip, { count, firstRequestTime }>
const rateLimitStore = new Map();

const rateLimiter = (req, res, next) => {
  // excluded routes from rate limiting
  if (["/auth/logout", "/api-docs"].includes(req.path)) return next();

  const ip = req.ip;

  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    // First request: set count and time
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }

  const userData = rateLimitStore.get(ip);

  if (now - userData.firstRequestTime < rateLimitWindowMs) {
    // Within the same window
    if (userData.count < maxRequestsPerWindow) {
      userData.count++;
      return next();
    } else {
      const waitTime = Math.ceil(
        (rateLimitWindowMs - (now - userData.firstRequestTime)) / 1000
      );
      return errorResponse(
        res,
        `Rate limit exceeded. Try again in ${waitTime} seconds.`,
        429
      );
    }
  } else {
    // Reset window
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }
};

export default rateLimiter;
