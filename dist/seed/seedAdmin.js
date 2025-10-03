"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const db_1 = require("../config/db");
const hash_1 = require("../utils/hash");
const env_1 = require("../config/env");
const seedAdmin = async () => {
    try {
        const existingAdmin = await db_1.prisma.user.findUnique({
            where: { email: env_1.env.ADMIN_EMAIL },
        });
        if (!existingAdmin) {
            const hashedPassword = await (0, hash_1.hashPassword)(env_1.env.ADMIN_PASSWORD);
            await db_1.prisma.user.create({
                data: {
                    name: env_1.env.ADMIN_NAME,
                    email: env_1.env.ADMIN_EMAIL,
                    password: hashedPassword,
                    role: "ADMIN",
                },
            });
            console.log("✅ Admin user seeded successfully!");
        }
        else {
            console.log("ℹ️ Admin already exists, skipping seed.");
        }
    }
    catch (error) {
        console.error("❌ Error seeding admin:", error);
    }
};
exports.seedAdmin = seedAdmin;
// import { prisma } from "../config/db";
// import { hashPassword } from "../utils/hash";
// export const seedAdmin = async () => {
//   try {
//     const ADMIN_EMAIL = "admin@gmail.com";
//     const ADMIN_PASSWORD = "admin123";
//     const ADMIN_NAME = "Super Admin";
//     const existingAdmin = await prisma.user.findUnique({
//       where: { email: ADMIN_EMAIL },
//     });
//     if (!existingAdmin) {
//       const hashedPassword = await hashPassword(ADMIN_PASSWORD);
//       await prisma.user.create({
//         data: {
//           name: ADMIN_NAME,
//           email: ADMIN_EMAIL,
//           password: hashedPassword,
//           role: "ADMIN",
//         },
//       });
//       console.log("✅ Admin user seeded successfully!");
//     } else {
//       console.log("ℹ️ Admin already exists, skipping seed.");
//     }
//   } catch (error) {
//     console.error("❌ Error seeding admin:", error);
//   }
// };
