
import multer, { StorageEngine } from "multer";
import { RequestHandler } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";
import path from "path";

const createCloudinaryStorage = (folder: string): StorageEngine =>
  new CloudinaryStorage({
    cloudinary,
    params: async (_req, _file) => ({
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
      transformation: [{ width: 1200, height: 1200, crop: "limit" }],
    }),
  });

const diskStorage = (folder: string): StorageEngine =>
  multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, `uploads/${folder}`),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
  });

const createMulter = (folder: "projects" | "blogs") => {
  if (process.env.NODE_ENV === "production" || process.env.USE_CLOUDINARY === "true") {
    return multer({ storage: createCloudinaryStorage(folder) });
  }
  return multer({ storage: diskStorage(folder) });
};

const createUploadHandlers = (
  folder: "projects" | "blogs"
): [RequestHandler, RequestHandler] => {
  const multerMiddleware = createMulter(folder).single("thumbnail");

  const postHandler: RequestHandler = (req, _res, next) => {
    const file = (req as any).file;
    if (!file) return next();

    let url = "";
    if (process.env.NODE_ENV === "production" || process.env.USE_CLOUDINARY === "true") {
      // Cloudinary returns absolute URL
      url = file.path;
    } else {
      // Local dev
      url = `http://localhost:${process.env.PORT ?? 4000}/uploads/${folder}/${file.filename}`;
      url = url.replace(/\\/g, "/");
    }

    (req as any).filePath = url;
    next();
  };

  return [multerMiddleware, postHandler];
};

export const uploadBlogForRouter = createUploadHandlers("blogs");
export const uploadProjectForRouter = createUploadHandlers("projects");

