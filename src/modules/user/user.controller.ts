// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import * as userService from "./user.service";

export const profile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  const u = await userService.findUserById(userId);
  return res.status(200).json({ success: true, user: u });
};

export const list = async (_req: Request, res: Response) => {
  const take = Number(_req.query.take ?? 50);
  const skip = Number(_req.query.skip ?? 0);
  const users = await userService.listUsers(take, skip);
  return res.status(200).json({ success: true, users });
};
