
// src/modules/project/project.routes.ts
import express from "express";
import * as projectController from "./project.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { uploadProjectForRouter } from "../../middlewares/upload.middleware";

const router = express.Router();

// ---------- Public routes ----------
router.get("/", projectController.list);
router.get("/:id", projectController.getById);

// ---------- Protected routes (with upload middleware) ----------
router.post(
  "/",
  authenticate,
  uploadProjectForRouter[0], // multer
  uploadProjectForRouter[1], // post-processing / filePath setter
  projectController.create
);

router.put(
  "/:id",
  authenticate,
  uploadProjectForRouter[0],
  uploadProjectForRouter[1],
  projectController.update
);

router.delete("/:id", authenticate, projectController.remove);

export default router;
