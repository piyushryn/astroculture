import jwt from "jsonwebtoken";

const signPayload = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyPayload = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { signPayload, verifyPayload };
