"use strict";
// import { Request, Response } from "express";
// import * as blogService from "./blog.service";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getById = exports.list = exports.update = exports.create = void 0;
const blogService = __importStar(require("./blog.service"));
// ---------- Create Blog ----------
const create = async (req, res) => {
    try {
        const body = req.body;
        const authorId = req.user?.id;
        if (!authorId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Upload middleware sets req.filePath
        const thumbnail = req.filePath ?? undefined;
        // String to Boolean convert
        const published = typeof body.published === "string"
            ? body.published === "true"
            : Boolean(body.published);
        const blog = await blogService.createBlog({
            ...body,
            authorId,
            thumbnail,
            published,
        });
        return res.status(201).json({ success: true, blog });
    }
    catch (err) {
        console.error("Blog create error:", err);
        return res
            .status(err?.statusCode ?? 400)
            .json({ message: err.message || "Create failed" });
    }
};
exports.create = create;
// ---------- Update Blog ----------
const update = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    // If upload middleware set a filePath, use it
    if (req.filePath) {
        payload.thumbnail = req.filePath;
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
    }
    catch (err) {
        console.error("Blog update error:", err);
        return res
            .status(err?.statusCode ?? 400)
            .json({ message: err.message || "Update failed" });
    }
};
exports.update = update;
// ---------- List Blogs ----------
const list = async (_req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        return res.status(200).json({ success: true, blogs });
    }
    catch (err) {
        console.error("Blog list error:", err);
        return res
            .status(err?.statusCode ?? 400)
            .json({ message: err.message || "List failed" });
    }
};
exports.list = list;
// ---------- Get Blog by ID ----------
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ success: true, blog });
    }
    catch (err) {
        console.error("Blog getById error:", err);
        return res
            .status(err?.statusCode ?? 400)
            .json({ message: err.message || "Fetch failed" });
    }
};
exports.getById = getById;
// ---------- Delete Blog ----------
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await blogService.deleteBlog(id);
        return res.status(200).json({ success: true, message: "Blog deleted" });
    }
    catch (err) {
        console.error("Blog delete error:", err);
        return res
            .status(err?.statusCode ?? 400)
            .json({ message: err.message || "Delete failed" });
    }
};
exports.remove = remove;
