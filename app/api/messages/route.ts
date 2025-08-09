import { currentProfile } from "@/lib/current-profile";
import { mongo, postgres } from "@/lib/db";
import { Message } from "@/prisma/generated/mongo";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");
    const pinned = searchParams.get("pinned");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    const whereClause: any = { channelId };
    if (pinned === "true") {
      whereClause.pinned = true;
    }

    if (cursor) {
      messages = await mongo.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await mongo.message.findMany({
        take: MESSAGES_BATCH,
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // Get unique member IDs from messages
    const messageMemberIds = [...new Set(messages.map((message) => message.memberId))];

    // Fetch member data from PostgreSQL for message authors
    const messageMembers = await postgres.member.findMany({
      where: {
        id: {
          in: messageMemberIds,
        },
      },
      include: {
        profile: true,
      },
    });

    const messageMemberMap = new Map(messageMembers.map((member) => [member.id, member]));

    // Fetch reactions for all messages in the batch
    const messageIds = messages.map((m) => m.id);
    const allReactions = await mongo.reaction.findMany({
      where: {
        messageId: { in: messageIds },
      },
      orderBy: { createdAt: "asc" },
    });

    // Fetch members for reactions
    const reactionMemberIds = [...new Set(allReactions.map((r) => r.memberId))];
    const reactionMembers = reactionMemberIds.length
      ? await postgres.member.findMany({
          where: { id: { in: reactionMemberIds } },
          include: { profile: true },
        })
      : [];
    const reactionMemberMap = new Map(reactionMembers.map((m) => [m.id, m]));

    // Group reactions by messageId
    const reactionsByMessageId = new Map<string, typeof allReactions>();
    for (const reaction of allReactions) {
      const list = reactionsByMessageId.get(reaction.messageId) ?? [];
      list.push(reaction);
      reactionsByMessageId.set(reaction.messageId, list);
    }

    // Combine messages with member and enriched reaction data
    const messagesWithMembers = messages
      .map((message) => {
        const author = messageMemberMap.get(message.memberId);
        if (!author) return null;
        const reactions = (reactionsByMessageId.get(message.id) ?? []).map((r) => ({
          ...r,
          member: reactionMemberMap.get(r.memberId) ?? null,
        }));
        return {
          ...message,
          member: author,
          reactions,
        };
      })
      .filter(Boolean);

    let nextCursor = null;
    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({ items: messagesWithMembers, nextCursor });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
