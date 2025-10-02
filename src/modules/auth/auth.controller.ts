// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "./auth.service";
import { RegisterDto, LoginDto } from "./auth.types";


export const register = async (req: Request, res: Response) => {
  const body = req.body as RegisterDto;
  if (!body.email || !body.password || !body.name) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const user = await authService.createUser(body);
  return res.status(201).json({ success: true, user });
};

export const login = async (req: Request, res: Response) => {
  const body = req.body as LoginDto;
  if (!body.email || !body.password) {
    return res.status(400).json({ message: "email and password required" });
  }

  const { user, token, expiresIn } = await authService.loginUser(body);
  return res.status(200).json({ success: true, user, accessToken: token, expiresIn });
};
