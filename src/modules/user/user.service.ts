import { prisma } from "../../config/db";

export const findUserById = async (id: string) => {
  const u = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!u) throw { statusCode: 404, message: "User not found" };
  return u;
};

export const listUsers = async (take = 50, skip = 0) => {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take,
    skip,
  });
};
