-- CreateEnum
CREATE TYPE "ServerCategory" AS ENUM ('POPULAR', 'CHRISTIANITY', 'BUSINESS', 'SOCIAL', 'SCIENCE_AND_EDUCATION');

-- AlterTable
ALTER TABLE "servers" ADD COLUMN     "category" "ServerCategory" NOT NULL DEFAULT 'POPULAR';
