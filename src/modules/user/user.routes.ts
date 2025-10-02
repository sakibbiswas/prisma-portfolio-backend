// src/modules/user/user.routes.ts
import express from "express";
import * as userController from "./user.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = express.Router();

// Protected
router.get("/me", authenticate, userController.profile);

// Owner-only listing (optional)
router.get("/", authenticate, userController.list);

export default router;
