import User from "../schema/user.js";
import bcrypt from "bcrypt";
import { signupSchema } from "../validations/auth.js";
import { getZodiacSignFromDate, signPayload } from "../utils/index.js";
import { setSecureCookie, removeCookie } from "../utils/setSecureCookie.js";

export const signup = async (req, res) => {
  const { name, email, password, birthDate } = req.body;

  const { error } = signupSchema.validate({ name, email, password, birthDate });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    birthDate,
    zodiacSign: getZodiacSignFromDate(birthDate),
  });

  res.status(200).json({ message: "User signed up successfully", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signPayload({ userId: user._id });

  // Set secure HTTP-only cookie
  res = setSecureCookie("token", token, res);

  res.status(200).json({ message: "Login successful" });
};

export const logout = async (req, res) => {
  res = removeCookie("token", res);
  res.status(200).json({ message: "Logout successful" });
};
