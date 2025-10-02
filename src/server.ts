import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { seedAdmin } from "./seed/seedAdmin";

const PORT = env.PORT || 5000;

(async () => {
  try {
    await connectDB(); // Connect database
    await seedAdmin(); // Seed admin user

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
