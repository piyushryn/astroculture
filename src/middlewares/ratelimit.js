import { errorResponse } from "../utils/apiResponse.js";

const rateLimitWindowMs = 1 * 60 * 1000; // 1 minute
const maxRequestsPerWindow = 5; // 5 requests per minute

// In-memory store: Map<ip, { count, firstRequestTime }>
const rateLimitStore = new Map();

const rateLimiter = (req, res, next) => {
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
