
// import { Request, Response } from "express";
// import * as blogService from "./blog.service";

// export const create = async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     const authorId = (req as any).user?.id;
//     if (!authorId) return res.status(401).json({ message: "Unauthorized" });

//     const thumbnail = (req as any).file
//       ? `/uploads/blogs/${(req as any).file.filename}`
//       : undefined;

//     // ✅ String to Boolean convert
//     const published =
//       typeof body.published === "string"
//         ? body.published === "true"
//         : Boolean(body.published);

//     const blog = await blogService.createBlog({
//       ...body,
//       authorId,
//       thumbnail,
//       published,
//     });

//     return res.status(201).json({ success: true, blog });
//   } catch (err: any) {
//     return res.status(400).json({ message: err.message || "Create failed" });
//   }
// };

// export const list = async (req: Request, res: Response) => {
//   const take = Number(req.query.take ?? 20);
//   const skip = Number(req.query.skip ?? 0);
//   const blogs = await blogService.getAllBlogs(take, skip);
//   return res.status(200).json({ success: true, blogs });
// };

// export const getById = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const blog = await blogService.getBlogById(id);
//   return res.status(200).json({ success: true, blog });
// };

// export const update = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const payload = req.body;

//   if ((req as any).file) {
//     payload.thumbnail = `/uploads/blogs/${(req as any).file.filename}`;
//   }

//   // ✅ Convert published to boolean
//   if (payload.published) {
//     payload.published =
//       typeof payload.published === "string"
//         ? payload.published === "true"
//         : Boolean(payload.published);
//   }

//   const updated = await blogService.updateBlog(id, payload);
//   return res.status(200).json({ success: true, updated });
// };

// export const remove = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   await blogService.deleteBlog(id);
//   return res.status(200).json({ success: true, message: "Deleted" });
// };














// src/modules/blog/blog.controller.ts
import { Request, Response } from "express";
import * as blogService from "./blog.service";

// ---------- Create Blog ----------
export const create = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const authorId = (req as any).user?.id;
    if (!authorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Upload middleware sets req.filePath
    const thumbnail = (req as any).filePath ?? undefined;

    // String to Boolean convert
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
    console.error("Blog create error:", err);
    return res
      .status(err?.statusCode ?? 400)
      .json({ message: err.message || "Create failed" });
  }
};

// ---------- Update Blog ----------
export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  // If upload middleware set a filePath, use it
  if ((req as any).filePath) {
    payload.thumbnail = (req as any).filePath;
  }

  // Convert published to boolean
  if (payload.published !== undefined) {
    payload.published =
      typeof payload.published === "string"
        ? payload.published === "true"
        : Boolean(payload.published);
  }

  try {
    const updated = await blogService.updateBlog(id, payload);
    return res.status(200).json({ success: true, updated });
  } catch (err: any) {
    console.error("Blog update error:", err);
    return res
      .status(err?.statusCode ?? 400)
      .json({ message: err.message || "Update failed" });
  }
};

// ---------- List Blogs ----------
export const list = async (_req: Request, res: Response) => {
  try {
    const blogs = await blogService.getAllBlogs();
    return res.status(200).json({ success: true, blogs });
  } catch (err: any) {
    console.error("Blog list error:", err);
    return res
      .status(err?.statusCode ?? 400)
      .json({ message: err.message || "List failed" });
  }
};

// ---------- Get Blog by ID ----------
export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ success: true, blog });
  } catch (err: any) {
    console.error("Blog getById error:", err);
    return res
      .status(err?.statusCode ?? 400)
      .json({ message: err.message || "Fetch failed" });
  }
};

// ---------- Delete Blog ----------
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await blogService.deleteBlog(id);
    return res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err: any) {
    console.error("Blog delete error:", err);
    return res
      .status(err?.statusCode ?? 400)
      .json({ message: err.message || "Delete failed" });
  }
};
