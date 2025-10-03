"use strict";
// // src/middlewares/upload.middleware.ts
// import multer from "multer";
// import path from "path";
// import fs from "fs";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProjectForRouter = exports.uploadBlogForRouter = void 0;
// /**
//  * Create multer upload middleware for given folder
//  * @param folder string - name of folder inside /uploads
//  */
// const createUpload = (folder: "projects" | "blogs") => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = path.join(__dirname, `../../uploads/${folder}`);
//       fs.mkdirSync(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const filename = `${Date.now()}-${file.fieldname}${ext}`;
//       cb(null, filename);
//     },
//   });
//   return multer({ storage });
// };
// // Export specific middlewares
// export const uploadProjectThumbnail = createUpload("projects");
// export const uploadBlogThumbnail = createUpload("blogs");
// import multer, { StorageEngine } from "multer";
// import { RequestHandler } from "express";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.config";
// import path from "path";
// const createCloudinaryStorage = (folder: string): StorageEngine =>
//   new CloudinaryStorage({
//     cloudinary,
//     params: async (_req, _file) => ({
//       folder,
//       format: undefined,
//       allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
//       transformation: [{ width: 1200, height: 1200, crop: "limit" }],
//     }),
//   });
// const diskStorage = (folder: string): StorageEngine =>
//   multer.diskStorage({
//     destination: (_req, _file, cb) => cb(null, `uploads/${folder}`),
//     filename: (_req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       cb(null, `${Date.now()}-${file.fieldname}${ext}`);
//     },
//   });
// const createMulter = (folder: "projects" | "blogs") => {
//   if (process.env.NODE_ENV === "production") {
//     return multer({ storage: createCloudinaryStorage(folder) });
//   }
//   return multer({ storage: diskStorage(folder) });
// };
// const createUploadHandlers = (
//   folder: "projects" | "blogs"
// ): [RequestHandler, RequestHandler] => {
//   const multerMiddleware = createMulter(folder).single("thumbnail");
//   const postHandler: RequestHandler = (req, _res, next) => {
//     const file = (req as any).file;
//     if (!file) return next();
//     let url = "";
//     if (process.env.NODE_ENV === "production") {
//       // Cloudinary returns absolute URL
//       url = file.path;
//     } else {
//       // Local dev: ensure proper slashes
//       url = `http://localhost:${process.env.PORT ?? 4000}/uploads/${folder}/${file.filename}`;
//       url = url.replace(/\\/g, "/"); // Fix backslashes
//     }
//     (req as any).filePath = url;
//     next();
//   };
//   return [multerMiddleware, postHandler];
// };
// export const uploadBlogForRouter = createUploadHandlers("blogs");
// export const uploadProjectForRouter = createUploadHandlers("projects");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const path_1 = __importDefault(require("path"));
const createCloudinaryStorage = (folder) => new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.default,
    params: async (_req, _file) => ({
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 1200, height: 1200, crop: "limit" }],
    }),
});
const diskStorage = (folder) => multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, `uploads/${folder}`),
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
});
const createMulter = (folder) => {
    if (process.env.NODE_ENV === "production" || process.env.USE_CLOUDINARY === "true") {
        return (0, multer_1.default)({ storage: createCloudinaryStorage(folder) });
    }
    return (0, multer_1.default)({ storage: diskStorage(folder) });
};
const createUploadHandlers = (folder) => {
    const multerMiddleware = createMulter(folder).single("thumbnail");
    const postHandler = (req, _res, next) => {
        const file = req.file;
        if (!file)
            return next();
        let url = "";
        if (process.env.NODE_ENV === "production" || process.env.USE_CLOUDINARY === "true") {
            // Cloudinary returns absolute URL
            url = file.path;
        }
        else {
            // Local dev
            url = `http://localhost:${process.env.PORT ?? 4000}/uploads/${folder}/${file.filename}`;
            url = url.replace(/\\/g, "/");
        }
        req.filePath = url;
        next();
    };
    return [multerMiddleware, postHandler];
};
exports.uploadBlogForRouter = createUploadHandlers("blogs");
exports.uploadProjectForRouter = createUploadHandlers("projects");
