"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.generateAccessToken = exports.validateUser = exports.createUser = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const client_1 = require("@prisma/client");
const SALT_ROUNDS = 10;
const createUser = async (dto) => {
    const existing = await db_1.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing)
        throw { statusCode: 400, message: "Email already in use" };
    const hashed = await bcrypt_1.default.hash(dto.password, SALT_ROUNDS);
    const user = await db_1.prisma.user.create({
        data: {
            name: dto.name,
            email: dto.email,
            password: hashed,
            role: dto.role ? dto.role : client_1.Role.USER,
        },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return user;
};
exports.createUser = createUser;
const validateUser = async (dto) => {
    const user = await db_1.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user)
        throw { statusCode: 401, message: "Invalid credentials" };
    const ok = await bcrypt_1.default.compare(dto.password, user.password);
    if (!ok)
        throw { statusCode: 401, message: "Invalid credentials" };
    return user;
};
exports.validateUser = validateUser;
const generateAccessToken = (payload) => {
    if (!env_1.env.JWT_ACCESS_SECRET)
        throw new Error("JWT_ACCESS_SECRET is not defined");
    // ✅ cast to ms.StringValue explicitly
    const expiresIn = (env_1.env.ACCESS_TOKEN_EXPIRES_IN || "15m");
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_ACCESS_SECRET, options);
};
exports.generateAccessToken = generateAccessToken;
const loginUser = async (dto) => {
    const user = await (0, exports.validateUser)(dto);
    const token = (0, exports.generateAccessToken)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    return {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
        expiresIn: env_1.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    };
};
exports.loginUser = loginUser;
