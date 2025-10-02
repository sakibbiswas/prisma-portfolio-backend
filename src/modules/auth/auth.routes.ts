// src/modules/auth/auth.routes.ts
import express from "express";
import { register, login } from "./auth.controller";

const router = express.Router();

// Public
router.post("/register", register); // optional - you can remove in production
router.post("/login", login);

export default router;
