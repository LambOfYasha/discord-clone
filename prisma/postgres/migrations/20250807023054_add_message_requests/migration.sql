-- CreateEnum
CREATE TYPE "MessageRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIEND_ACTIVITY', 'SERVER_ACTIVITY', 'FRIEND_ONLINE', 'SERVER_JOIN', 'MESSAGE_MENTION', 'SERVER_INVITE');

-- CreateTable
CREATE TABLE "message_requests" (
    "id" TEXT NOT NULL,
    "requesterProfileId" TEXT NOT NULL,
    "targetProfileId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "MessageRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "id" TEXT NOT NULL,
    "followerProfileId" TEXT NOT NULL,
    "followingProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_follows" (
    "id" TEXT NOT NULL,
    "followerProfileId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "server_follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "recipientProfileId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "relatedProfileId" TEXT,
    "relatedServerId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follows_followerProfileId_followingProfileId_key" ON "follows"("followerProfileId", "followingProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "server_follows_followerProfileId_serverId_key" ON "server_follows"("followerProfileId", "serverId");

-- AddForeignKey
ALTER TABLE "message_requests" ADD CONSTRAINT "message_requests_requesterProfileId_fkey" FOREIGN KEY ("requesterProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_requests" ADD CONSTRAINT "message_requests_targetProfileId_fkey" FOREIGN KEY ("targetProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerProfileId_fkey" FOREIGN KEY ("followerProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingProfileId_fkey" FOREIGN KEY ("followingProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_follows" ADD CONSTRAINT "server_follows_followerProfileId_fkey" FOREIGN KEY ("followerProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_follows" ADD CONSTRAINT "server_follows_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipientProfileId_fkey" FOREIGN KEY ("recipientProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_relatedProfileId_fkey" FOREIGN KEY ("relatedProfileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_relatedServerId_fkey" FOREIGN KEY ("relatedServerId") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
