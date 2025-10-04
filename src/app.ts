import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import blogRoutes from "./modules/blog/blog.routes";
import projectRoutes from "./modules/project/project.routes";

const app: Application = express();

// Helmet (disable cross-origin restrictions for simplicity)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Global CORS for API
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      "https://next-portfolio-frontend-gold.vercel.app", // Deployed frontend
    ],
    credentials: true,
  })
);


// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);

//  Serve static uploads with proper CORS headers
const uploadsPath = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/uploads", express.static(uploadsPath, { dotfiles: "allow" }));

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running 🚀" });
});

// Global error handler
app.use(errorHandler);

export default app;









