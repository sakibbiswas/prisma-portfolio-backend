"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.findUserById = void 0;
const db_1 = require("../../config/db");
const findUserById = async (id) => {
    const u = await db_1.prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!u)
        throw { statusCode: 404, message: "User not found" };
    return u;
};
exports.findUserById = findUserById;
const listUsers = async (take = 50, skip = 0) => {
    return db_1.prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take,
        skip,
    });
};
exports.listUsers = listUsers;
