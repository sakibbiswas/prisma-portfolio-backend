"use strict";
// import express from "express";
// import * as blogController from "./blog.controller";
// import { authenticate } from "../../middlewares/auth.middleware";
// import { uploadBlogThumbnail } from "../../middlewares/upload.middleware";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// // Public
// router.get("/", blogController.list);
// router.get("/:id", blogController.getById);
// // Protected
// router.post(
//   "/",
//   authenticate,
//   uploadBlogThumbnail.single("thumbnail"),
//   blogController.create
// );
// router.put(
//   "/:id",
//   authenticate,
//   uploadBlogThumbnail.single("thumbnail"),
//   blogController.update
// );
// router.delete("/:id", authenticate, blogController.remove);
// export default router;
// src/modules/blog/blog.routes.ts
const express_1 = __importDefault(require("express"));
const blogController = __importStar(require("./blog.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = express_1.default.Router();
// ---------- Public Routes ----------
router.get("/", blogController.list);
router.get("/:id", blogController.getById);
// ---------- Protected Routes (requires login) ----------
// Create Blog
router.post("/", auth_middleware_1.authenticate, upload_middleware_1.uploadBlogForRouter[0], // multer middleware (file parsing)
upload_middleware_1.uploadBlogForRouter[1], // post-upload handler (sets req.filePath)
blogController.create);
// Update Blog
router.put("/:id", auth_middleware_1.authenticate, upload_middleware_1.uploadBlogForRouter[0], upload_middleware_1.uploadBlogForRouter[1], blogController.update);
// Delete Blog
router.delete("/:id", auth_middleware_1.authenticate, blogController.remove);
exports.default = router;
