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
