// src/middlewares/upload.middleware.ts
import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Create multer upload middleware for given folder
 * @param folder string - name of folder inside /uploads
 */
const createUpload = (folder: "projects" | "blogs") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, `../../uploads/${folder}`);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, filename);
    },
  });

  return multer({ storage });
};


// Export specific middlewares
export const uploadProjectThumbnail = createUpload("projects");
export const uploadBlogThumbnail = createUpload("blogs");
