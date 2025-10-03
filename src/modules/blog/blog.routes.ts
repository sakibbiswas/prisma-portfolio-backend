
// src/modules/blog/blog.routes.ts
import express from "express";
import * as blogController from "./blog.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { uploadBlogForRouter } from "../../middlewares/upload.middleware";

const router = express.Router();

// ---------- Public Routes ----------
router.get("/", blogController.list);
router.get("/:id", blogController.getById);

// ---------- Protected Routes (requires login) ----------
// Create Blog
router.post(
  "/",
  authenticate,
  uploadBlogForRouter[0], // multer middleware (file parsing)
  uploadBlogForRouter[1], // post-upload handler (sets req.filePath)
  blogController.create
);

// Update Blog
router.put(
  "/:id",
  authenticate,
  uploadBlogForRouter[0],
  uploadBlogForRouter[1],
  blogController.update
);

// Delete Blog
router.delete("/:id", authenticate, blogController.remove);

export default router;
