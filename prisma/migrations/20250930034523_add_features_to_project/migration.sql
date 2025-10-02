-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[];
