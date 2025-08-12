-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING_FOR_USER', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('GENERAL', 'TECHNICAL', 'BILLING', 'FEATURE_REQUEST', 'BUG_REPORT', 'OTHER');

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fileUrl" TEXT,
    "memberId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "replyTo" TEXT,
    "threadId" TEXT,
    "threadParentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "creatorProfileId" TEXT NOT NULL,
    "scheduleType" "ScheduleType" NOT NULL,
    "scheduleData" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSentAt" TIMESTAMP(3),
    "nextSendAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scheduled_announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_systems" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "welcomeMessage" TEXT,
    "maxOpenTickets" INTEGER NOT NULL DEFAULT 3,
    "autoCloseHours" INTEGER NOT NULL DEFAULT 72,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "category" "TicketCategory" NOT NULL DEFAULT 'GENERAL',
    "requesterProfileId" TEXT NOT NULL,
    "assignedProfileId" TEXT,
    "serverId" TEXT NOT NULL,
    "ticketSystemId" TEXT NOT NULL,
    "channelId" TEXT,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fileUrl" TEXT,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "ticketId" TEXT NOT NULL,
    "senderProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_systems_serverId_key" ON "ticket_systems"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_systems_channelId_key" ON "ticket_systems"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticketNumber_key" ON "tickets"("ticketNumber");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_announcements" ADD CONSTRAINT "scheduled_announcements_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_announcements" ADD CONSTRAINT "scheduled_announcements_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_announcements" ADD CONSTRAINT "scheduled_announcements_creatorProfileId_fkey" FOREIGN KEY ("creatorProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_systems" ADD CONSTRAINT "ticket_systems_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_systems" ADD CONSTRAINT "ticket_systems_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_requesterProfileId_fkey" FOREIGN KEY ("requesterProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assignedProfileId_fkey" FOREIGN KEY ("assignedProfileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketSystemId_fkey" FOREIGN KEY ("ticketSystemId") REFERENCES "ticket_systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_senderProfileId_fkey" FOREIGN KEY ("senderProfileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
