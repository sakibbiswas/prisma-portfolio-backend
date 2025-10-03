
// src/modules/project/project.controller.ts
import { Request, Response } from "express";
import * as projectService from "./project.service";

// ---------- Create a new project ----------
export const create = async (req: Request, res: Response) => {
  try {
    const ownerId = (req as any).user?.id;
    if (!ownerId) return res.status(401).json({ message: "Unauthorized" });

    // Upload middleware sets req.filePath
    const thumbnail = (req as any).filePath ?? undefined;

    const project = await projectService.createProject({
      ...req.body,
      ownerId,
      thumbnail,
      features: req.body.features ? JSON.parse(req.body.features) : [],
      techStack: req.body.techStack ? JSON.parse(req.body.techStack) : [],
    });

    return res.status(201).json({ success: true, project });
  } catch (err: any) {
    console.error("Project create error:", err);
    return res
      .status(err?.statusCode ?? 500)
      .json({ success: false, message: err.message || "Create failed" });
  }
};

// ---------- List all projects ----------
export const list = async (req: Request, res: Response) => {
  try {
    const take = Number(req.query.take ?? 20);
    const skip = Number(req.query.skip ?? 0);
    const projects = await projectService.listProjects(take, skip);
    return res.status(200).json({ success: true, projects });
  } catch (err: any) {
    console.error("Project list error:", err);
    return res
      .status(err?.statusCode ?? 500)
      .json({ success: false, message: err.message || "List failed" });
  }
};

// ---------- Get project by ID ----------
export const getById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, project });
  } catch (err: any) {
    console.error("Project getById error:", err);
    return res
      .status(err?.statusCode ?? 500)
      .json({ success: false, message: err.message || "Fetch failed" });
  }
};

// ---------- Update a project ----------
export const update = async (req: Request, res: Response) => {
  try {
    // Upload middleware sets req.filePath
    const thumbnail = (req as any).filePath ?? undefined;

    const updated = await projectService.updateProject(req.params.id, {
      ...req.body,
      ...(thumbnail ? { thumbnail } : {}),
      features: req.body.features ? JSON.parse(req.body.features) : [],
      techStack: req.body.techStack ? JSON.parse(req.body.techStack) : [],
    });

    return res.status(200).json({ success: true, updated });
  } catch (err: any) {
    console.error("Project update error:", err);
    return res
      .status(err?.statusCode ?? 500)
      .json({ success: false, message: err.message || "Update failed" });
  }
};

// ---------- Delete a project ----------
export const remove = async (req: Request, res: Response) => {
  try {
    await projectService.deleteProject(req.params.id);
    return res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err: any) {
    console.error("Project delete error:", err);
    return res
      .status(err?.statusCode ?? 500)
      .json({ success: false, message: err.message || "Delete failed" });
  }
};
