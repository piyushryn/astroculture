import User from "../schema/user.js";
import bcrypt from "bcrypt";
import { signupSchema } from "../validations/auth.js";
import { getZodiacSignFromDate, signPayload } from "../utils/index.js";
import { setSecureCookie, removeCookie } from "../utils/setSecureCookie.js";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  conflictResponse,
} from "../utils/apiResponse.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, birthDate } = req.body;

    const { error } = signupSchema.validate({
      name,
      email,
      password,
      birthDate,
    });

    if (error) {
      return validationErrorResponse(res, error.message);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return conflictResponse(res, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      zodiacSign: getZodiacSignFromDate(birthDate),
    });

    return successResponse(res, user, "User signed up successfully", 201);
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse(res, "Failed to create user", 500, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return validationErrorResponse(res, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return unauthorizedResponse(res, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return unauthorizedResponse(res, "Invalid credentials");
    }

    const token = signPayload({ userId: user._id });

    // Set secure HTTP-only cookie
    setSecureCookie("token", token, res);

    return successResponse(res, null, "Login successful");
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, "Failed to login", 500, error);
  }
};

export const logout = async (req, res) => {
  try {
    removeCookie("token", res);
    return successResponse(res, null, "Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse(res, "Failed to logout", 500, error);
  }
};
