
import { Request, Response } from "express";
import * as blogService from "./blog.service";

export const create = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const authorId = (req as any).user?.id;
    if (!authorId) return res.status(401).json({ message: "Unauthorized" });

    const thumbnail = (req as any).file
      ? `/uploads/blogs/${(req as any).file.filename}`
      : undefined;

    // ✅ String to Boolean convert
    const published =
      typeof body.published === "string"
        ? body.published === "true"
        : Boolean(body.published);

    const blog = await blogService.createBlog({
      ...body,
      authorId,
      thumbnail,
      published,
    });

    return res.status(201).json({ success: true, blog });
  } catch (err: any) {
    return res.status(400).json({ message: err.message || "Create failed" });
  }
};

export const list = async (req: Request, res: Response) => {
  const take = Number(req.query.take ?? 20);
  const skip = Number(req.query.skip ?? 0);
  const blogs = await blogService.getAllBlogs(take, skip);
  return res.status(200).json({ success: true, blogs });
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blog = await blogService.getBlogById(id);
  return res.status(200).json({ success: true, blog });
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  if ((req as any).file) {
    payload.thumbnail = `/uploads/blogs/${(req as any).file.filename}`;
  }

  // ✅ Convert published to boolean
  if (payload.published) {
    payload.published =
      typeof payload.published === "string"
        ? payload.published === "true"
        : Boolean(payload.published);
  }

  const updated = await blogService.updateBlog(id, payload);
  return res.status(200).json({ success: true, updated });
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  await blogService.deleteBlog(id);
  return res.status(200).json({ success: true, message: "Deleted" });
};
