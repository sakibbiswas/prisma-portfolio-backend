"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const db_1 = require("../../config/db");
const createBlog = async (data) => {
    return db_1.prisma.blog.create({
        data: {
            title: data.title,
            slug: data.slug ?? data.title.toLowerCase().replace(/\s+/g, "-"),
            content: data.content,
            excerpt: data.excerpt ?? data.content.slice(0, 200),
            published: data.published ?? false, // ✅ Boolean thakbe
            thumbnail: data.thumbnail,
            author: { connect: { id: data.authorId } },
        },
    });
};
exports.createBlog = createBlog;
const getAllBlogs = async (take = 20, skip = 0) => {
    return db_1.prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        take,
        skip,
        include: { author: { select: { id: true, name: true, email: true } } },
    });
};
exports.getAllBlogs = getAllBlogs;
const getBlogById = async (id) => {
    const b = await db_1.prisma.blog.findUnique({
        where: { id },
        include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!b)
        throw { statusCode: 404, message: "Blog not found" };
    return b;
};
exports.getBlogById = getBlogById;
const updateBlog = async (id, data) => {
    const exists = await db_1.prisma.blog.findUnique({ where: { id } });
    if (!exists)
        throw { statusCode: 404, message: "Blog not found" };
    return db_1.prisma.blog.update({
        where: { id },
        data: {
            ...data,
            published: typeof data.published === "string"
                ? data.published === "true"
                : data.published,
        },
    });
};
exports.updateBlog = updateBlog;
const deleteBlog = async (id) => {
    const exists = await db_1.prisma.blog.findUnique({ where: { id } });
    if (!exists)
        throw { statusCode: 404, message: "Blog not found" };
    await db_1.prisma.blog.delete({ where: { id } });
    return { deleted: true };
};
exports.deleteBlog = deleteBlog;
