
import { prisma } from "../../config/db";

export const createBlog = async (data: {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  authorId: string;
  published?: boolean;
  thumbnail?: string;
}) => {
  return prisma.blog.create({
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

export const getAllBlogs = async (take = 20, skip = 0) => {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take,
    skip,
    include: { author: { select: { id: true, name: true, email: true } } },
  });
};

export const getBlogById = async (id: string) => {
  const b = await prisma.blog.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } } },
  });
  if (!b) throw { statusCode: 404, message: "Blog not found" };
  return b;
};

export const updateBlog = async (id: string, data: Partial<any>) => {
  const exists = await prisma.blog.findUnique({ where: { id } });
  if (!exists) throw { statusCode: 404, message: "Blog not found" };

  return prisma.blog.update({
    where: { id },
    data: {
      ...data,
      published:
        typeof data.published === "string"
          ? data.published === "true"
          : data.published,
    },
  });
};

export const deleteBlog = async (id: string) => {
  const exists = await prisma.blog.findUnique({ where: { id } });
  if (!exists) throw { statusCode: 404, message: "Blog not found" };
  await prisma.blog.delete({ where: { id } });
  return { deleted: true };
};

