// src/modules/auth/auth.routes.ts
import express from "express";
import { register, login } from "./auth.controller";

const router = express.Router();

// Public
router.post("/register", register); 
router.post("/login", login);

export default router;
