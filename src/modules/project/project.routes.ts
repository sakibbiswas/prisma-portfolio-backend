
import express from "express";
import * as projectController from "./project.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { uploadProjectThumbnail } from "../../middlewares/upload.middleware";

const router = express.Router();

// Public
router.get("/", projectController.list);
router.get("/:id", projectController.getById);

// Protected
router.post(
  "/",
  authenticate,
  uploadProjectThumbnail.single("thumbnail"),
  projectController.create
);
router.put(
  "/:id",
  authenticate,
  uploadProjectThumbnail.single("thumbnail"),
  projectController.update
);
router.delete("/:id", authenticate, projectController.remove);

export default router;
