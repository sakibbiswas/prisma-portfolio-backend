"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.listProjects = exports.createProject = void 0;
// src/modules/project/project.service.ts
const db_1 = require("../../config/db");
const createProject = async (data) => {
    const project = await db_1.prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
            liveUrl: data.liveUrl,
            repoUrl: data.repoUrl,
            features: data.features ?? [],
            techStack: data.techStack ?? [], // new
            owner: { connect: { id: data.ownerId } },
        },
    });
    return project;
};
exports.createProject = createProject;
const listProjects = async (take = 20, skip = 0) => {
    return db_1.prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        take,
        skip,
        include: { owner: { select: { id: true, name: true } } },
    });
};
exports.listProjects = listProjects;
const getProjectById = async (id) => {
    const p = await db_1.prisma.project.findUnique({
        where: { id },
        include: { owner: { select: { id: true, name: true } } },
    });
    if (!p)
        throw { statusCode: 404, message: "Project not found" };
    return p;
};
exports.getProjectById = getProjectById;
const updateProject = async (id, data) => {
    const exists = await db_1.prisma.project.findUnique({ where: { id } });
    if (!exists)
        throw { statusCode: 404, message: "Project not found" };
    return db_1.prisma.project.update({ where: { id }, data });
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    const exists = await db_1.prisma.project.findUnique({ where: { id } });
    if (!exists)
        throw { statusCode: 404, message: "Project not found" };
    await db_1.prisma.project.delete({ where: { id } });
    return { deleted: true };
};
exports.deleteProject = deleteProject;
