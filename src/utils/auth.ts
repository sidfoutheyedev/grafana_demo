import jwt from 'jsonwebtoken';

export const signToken = (payload: Record<string, unknown>) =>
  jwt.sign(payload, process.env.JWT_SECRET || "change_me", { expiresIn: "1d" });
export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || "change_me");
