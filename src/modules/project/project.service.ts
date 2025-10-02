// // src/modules/project/project.service.ts
// import { prisma } from "../../config/db";

// export const createProject = async (data: {
//   title: string;
//   description: string;
//   thumbnail?: string;
//   liveUrl?: string;
//   repoUrl?: string;
//   features?: string[];
//   ownerId: string;
// }) => {
//   const project = await prisma.project.create({
//     data: {
//       title: data.title,
//       description: data.description,
//       thumbnail: data.thumbnail,
//       liveUrl: data.liveUrl,
//       repoUrl: data.repoUrl,
//       features: data.features ?? [],
//       owner: { connect: { id: data.ownerId } },
//     },
//   });
//   return project;
// };

// export const listProjects = async (take = 20, skip = 0) => {
//   return prisma.project.findMany({
//     orderBy: { createdAt: "desc" },
//     take,
//     skip,
//     include: { owner: { select: { id: true, name: true } } },
//   });
// };

// export const getProjectById = async (id: string) => {
//   const p = await prisma.project.findUnique({
//     where: { id },
//     include: { owner: { select: { id: true, name: true } } },
//   });
//   if (!p) throw { statusCode: 404, message: "Project not found" };
//   return p;
// };

// export const updateProject = async (id: string, data: Partial<any>) => {
//   const exists = await prisma.project.findUnique({ where: { id } });
//   if (!exists) throw { statusCode: 404, message: "Project not found" };
//   return prisma.project.update({ where: { id }, data });
// };

// export const deleteProject = async (id: string) => {
//   const exists = await prisma.project.findUnique({ where: { id } });
//   if (!exists) throw { statusCode: 404, message: "Project not found" };
//   await prisma.project.delete({ where: { id } });
//   return { deleted: true };
// };


// src/modules/project/project.service.ts
import { prisma } from "../../config/db";

export const createProject = async (data: {
  title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  repoUrl?: string;
  features?: string[];
  techStack?: string[]; // new
  ownerId: string;
}) => {
  const project = await prisma.project.create({
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

export const listProjects = async (take = 20, skip = 0) => {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take,
    skip,
    include: { owner: { select: { id: true, name: true } } },
  });
};

export const getProjectById = async (id: string) => {
  const p = await prisma.project.findUnique({
    where: { id },
    include: { owner: { select: { id: true, name: true } } },
  });
  if (!p) throw { statusCode: 404, message: "Project not found" };
  return p;
};

export const updateProject = async (id: string, data: Partial<any>) => {
  const exists = await prisma.project.findUnique({ where: { id } });
  if (!exists) throw { statusCode: 404, message: "Project not found" };
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = async (id: string) => {
  const exists = await prisma.project.findUnique({ where: { id } });
  if (!exists) throw { statusCode: 404, message: "Project not found" };
  await prisma.project.delete({ where: { id } });
  return { deleted: true };
};
