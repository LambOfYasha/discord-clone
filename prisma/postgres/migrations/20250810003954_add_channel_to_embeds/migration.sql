/*
  Warnings:

  - The `type` column on the `channels` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `friend_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `group_conversation_members` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `members` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `message_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherLocationType` column on the `server_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `servers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `server_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- CreateEnum
CREATE TYPE "GroupMemberRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('TEXT', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MessageRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ServerCategory" AS ENUM ('POPULAR', 'CHRISTIANITY', 'BUSINESS', 'SOCIAL', 'SCIENCE_AND_EDUCATION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIEND_ACTIVITY', 'SERVER_ACTIVITY', 'FRIEND_ONLINE', 'SERVER_JOIN', 'MESSAGE_MENTION', 'SERVER_INVITE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'IDLE', 'DO_NOT_DISTURB', 'INVISIBLE');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('VOICE', 'OTHER');

-- CreateEnum
CREATE TYPE "OtherEventLocationType" AS ENUM ('TEXT_CHANNEL', 'EXTERNAL', 'LOCATION');

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "type",
ADD COLUMN     "type" "ChannelType" NOT NULL DEFAULT 'TEXT';

-- AlterTable
ALTER TABLE "embeds" ADD COLUMN     "channelId" TEXT;

-- AlterTable
ALTER TABLE "friend_requests" DROP COLUMN "status",
ADD COLUMN     "status" "FriendRequestStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "group_conversation_members" DROP COLUMN "role",
ADD COLUMN     "role" "GroupMemberRole" NOT NULL DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "members" DROP COLUMN "role",
ADD COLUMN     "role" "MemberRole" NOT NULL DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "message_requests" DROP COLUMN "status",
ADD COLUMN     "status" "MessageRequestStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ONLINE';

-- AlterTable
ALTER TABLE "server_events" DROP COLUMN "type",
ADD COLUMN     "type" "EventType" NOT NULL,
DROP COLUMN "otherLocationType",
ADD COLUMN     "otherLocationType" "OtherEventLocationType";

-- AlterTable
ALTER TABLE "servers" DROP COLUMN "category",
ADD COLUMN     "category" "ServerCategory" NOT NULL DEFAULT 'POPULAR';

-- AddForeignKey
ALTER TABLE "embeds" ADD CONSTRAINT "embeds_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
