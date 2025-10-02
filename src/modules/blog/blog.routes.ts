
import express from "express";
import * as blogController from "./blog.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { uploadBlogThumbnail } from "../../middlewares/upload.middleware";

const router = express.Router();

// Public
router.get("/", blogController.list);
router.get("/:id", blogController.getById);

// Protected
router.post(
  "/",
  authenticate,
  uploadBlogThumbnail.single("thumbnail"),
  blogController.create
);

router.put(
  "/:id",
  authenticate,
  uploadBlogThumbnail.single("thumbnail"),
  blogController.update
);

router.delete("/:id", authenticate, blogController.remove);

export default router;
