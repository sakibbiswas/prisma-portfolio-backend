import { prisma } from "../config/db";
import { hashPassword } from "../utils/hash";
import { env } from "../config/env";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: env.ADMIN_EMAIL },
    });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword(env.ADMIN_PASSWORD);
      await prisma.user.create({
        data: {
          name: env.ADMIN_NAME,
          email: env.ADMIN_EMAIL,
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      console.log("✅ Admin user seeded successfully!");
    } else {
      console.log("ℹ️ Admin already exists, skipping seed.");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  }
};














