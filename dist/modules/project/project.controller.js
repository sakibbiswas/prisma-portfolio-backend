"use strict";
// // src/modules/project/project.controller.ts
// import { Request, Response } from "express";
// import * as projectService from "./project.service";
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
exports.remove = exports.update = exports.getById = exports.list = exports.create = void 0;
const projectService = __importStar(require("./project.service"));
// ---------- Create a new project ----------
const create = async (req, res) => {
    try {
        const ownerId = req.user?.id;
        if (!ownerId)
            return res.status(401).json({ message: "Unauthorized" });
        // Upload middleware sets req.filePath
        const thumbnail = req.filePath ?? undefined;
        const project = await projectService.createProject({
            ...req.body,
            ownerId,
            thumbnail,
            features: req.body.features ? JSON.parse(req.body.features) : [],
            techStack: req.body.techStack ? JSON.parse(req.body.techStack) : [],
        });
        return res.status(201).json({ success: true, project });
    }
    catch (err) {
        console.error("Project create error:", err);
        return res
            .status(err?.statusCode ?? 500)
            .json({ success: false, message: err.message || "Create failed" });
    }
};
exports.create = create;
// ---------- List all projects ----------
const list = async (req, res) => {
    try {
        const take = Number(req.query.take ?? 20);
        const skip = Number(req.query.skip ?? 0);
        const projects = await projectService.listProjects(take, skip);
        return res.status(200).json({ success: true, projects });
    }
    catch (err) {
        console.error("Project list error:", err);
        return res
            .status(err?.statusCode ?? 500)
            .json({ success: false, message: err.message || "List failed" });
    }
};
exports.list = list;
// ---------- Get project by ID ----------
const getById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        return res.status(200).json({ success: true, project });
    }
    catch (err) {
        console.error("Project getById error:", err);
        return res
            .status(err?.statusCode ?? 500)
            .json({ success: false, message: err.message || "Fetch failed" });
    }
};
exports.getById = getById;
// ---------- Update a project ----------
const update = async (req, res) => {
    try {
        // Upload middleware sets req.filePath
        const thumbnail = req.filePath ?? undefined;
        const updated = await projectService.updateProject(req.params.id, {
            ...req.body,
            ...(thumbnail ? { thumbnail } : {}),
            features: req.body.features ? JSON.parse(req.body.features) : [],
            techStack: req.body.techStack ? JSON.parse(req.body.techStack) : [],
        });
        return res.status(200).json({ success: true, updated });
    }
    catch (err) {
        console.error("Project update error:", err);
        return res
            .status(err?.statusCode ?? 500)
            .json({ success: false, message: err.message || "Update failed" });
    }
};
exports.update = update;
// ---------- Delete a project ----------
const remove = async (req, res) => {
    try {
        await projectService.deleteProject(req.params.id);
        return res.status(200).json({ success: true, message: "Project deleted" });
    }
    catch (err) {
        console.error("Project delete error:", err);
        return res
            .status(err?.statusCode ?? 500)
            .json({ success: false, message: err.message || "Delete failed" });
    }
};
exports.remove = remove;
