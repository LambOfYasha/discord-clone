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

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await mongo.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: { channelId },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await mongo.message.findMany({
        take: MESSAGES_BATCH,
        where: { channelId },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // Get unique member IDs from messages
    const memberIds = [...new Set(messages.map(message => message.memberId))];

    // Fetch member data from PostgreSQL
    const members = await postgres.member.findMany({
      where: {
        id: {
          in: memberIds,
        },
      },
      include: {
        profile: true,
      },
    });

    // Create a map for quick member lookup
    const memberMap = new Map(members.map(member => [member.id, member]));

    // Combine messages with member data
    const messagesWithMembers = messages.map(message => ({
      ...message,
      member: memberMap.get(message.memberId),
    })).filter(message => message.member); // Filter out messages with missing members

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
