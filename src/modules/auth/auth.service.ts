import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { RegisterDto, LoginDto, TokenPayload } from "./auth.types";
import { Role } from "@prisma/client"; 

const SALT_ROUNDS = 10;

export const createUser = async (dto: RegisterDto) => {
  const existing = await prisma.user.findUnique({ where: { email: dto.email } });
  if (existing) throw { statusCode: 400, message: "Email already in use" };

  const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      name: dto.name,
      email: dto.email,
      password: hashed,
      role: dto.role ? (dto.role as Role) : Role.USER,
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return user;
};

export const validateUser = async (dto: LoginDto) => {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw { statusCode: 401, message: "Invalid credentials" };

  const ok = await bcrypt.compare(dto.password, user.password);
  if (!ok) throw { statusCode: 401, message: "Invalid credentials" };

  return user;
};

export const generateAccessToken = (payload: TokenPayload) => {
  if (!env.JWT_ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is not defined");

  // ✅ cast to ms.StringValue explicitly
  const expiresIn: jwt.SignOptions["expiresIn"] = (env.ACCESS_TOKEN_EXPIRES_IN || "15m") as jwt.SignOptions["expiresIn"];

  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const loginUser = async (dto: LoginDto) => {
  const user = await validateUser(dto);

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  };
};
