-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "techStack" TEXT[] DEFAULT ARRAY[]::TEXT[];
