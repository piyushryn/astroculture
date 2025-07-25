import dotenv from "dotenv";

dotenv.config();

/**
 * Set a secure HTTP-only cookie
 * @param {string} key - Cookie name
 * @param {string} value - Cookie value
 * @param {object} res - Express response object
 * @param {object} options - Additional cookie options (optional)
 * @returns {object} - Express response object
 */
export const setSecureCookie = (key, value, res, options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * +process.env.COOKIE_MAX_AGE_IN_DAYS,
    sameSite: "strict",
    path: "/",
  };

  const cookieOptions = { ...defaultOptions, ...options };

  res.cookie(key, value, cookieOptions);
};

/**
 * Remove a cookie by setting it to expire immediately
 * @param {string} key - Cookie name
 * @param {object} res - Express response object
 * @param {object} options - Additional cookie options (optional)
 * @returns {object} - Express response object
 */
export const removeCookie = (key, res, options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  };

  const cookieOptions = { ...defaultOptions, ...options };

  res.cookie(key, "", cookieOptions);
};
