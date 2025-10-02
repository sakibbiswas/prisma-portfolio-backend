import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

type Payload = Record<string, any>; // You can replace 'any' with your own type

export const signToken = (payload: Payload, expiresIn: string = env.ACCESS_TOKEN_EXPIRES_IN) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    // jwt.verify returns string | JwtPayload, so ensure we return only JwtPayload
    if (typeof decoded === "string") return null;
    return decoded;
  } catch {
    return null;
  }
};
