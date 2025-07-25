import { verifyPayload } from "../utils/index.js";
import { unauthorizedResponse } from "../utils/apiResponse.js";

export const checkValidUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return unauthorizedResponse(res, "Access token required");
    }

    const decoded = verifyPayload(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return unauthorizedResponse(res, "Invalid or expired token");
  }
};
