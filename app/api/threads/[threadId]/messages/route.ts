import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.threadId) {
      return new NextResponse("Thread ID missing", { status: 400 });
    }

    console.log("[THREAD_MESSAGES_GET] Fetching messages for thread:", params.threadId);

    // Get thread messages from MongoDB (primary)
    const { mongo } = await import("@/lib/db");
    
    console.log("[THREAD_MESSAGES_GET] MongoDB client imported successfully");
    
    let messages;
    if (cursor) {
      console.log("[THREAD_MESSAGES_GET] Using cursor:", cursor);
      messages = await mongo.message.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          threadId: params.threadId,
          deleted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      console.log("[THREAD_MESSAGES_GET] No cursor, fetching first page");
      messages = await mongo.message.findMany({
        take: limit,
        where: {
          threadId: params.threadId,
          deleted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // Get member information for each message from PostgreSQL
    const memberIds = [...new Set(messages.map(msg => msg.memberId))];
    const members = await db.member.findMany({
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

    // Attach member information to messages
    const messagesWithMembers = messages.map(message => ({
      ...message,
      member: memberMap.get(message.memberId),
    }));

    console.log("[THREAD_MESSAGES_GET] Found messages:", messagesWithMembers.length);

    let nextCursor = null;
    if (messagesWithMembers.length === limit) {
      nextCursor = messagesWithMembers[messagesWithMembers.length - 1].id;
    }

    return NextResponse.json({
      items: messagesWithMembers,
      nextCursor,
    });
  } catch (error) {
    console.error("[THREAD_MESSAGES_GET] Error details:", error);
    console.error("[THREAD_MESSAGES_GET] Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const profile = await currentProfile();
    const { content, fileUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!content) {
      return new NextResponse("Content missing", { status: 400 });
    }

    if (!params.threadId) {
      return new NextResponse("Thread ID missing", { status: 400 });
    }

    // Get member info from PostgreSQL
    const member = await db.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    // Create message in MongoDB (primary)
    const { mongo } = await import("@/lib/db");
    
    const message = await mongo.message.create({
      data: {
        content,
        fileUrl,
        memberId: member.id,
        threadId: params.threadId,
        channelId: "", // Will be set from thread
      },
    });

    // Update thread message count in PostgreSQL (backup)
    await db.thread.update({
      where: {
        id: params.threadId,
      },
      data: {
        messageCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[THREAD_MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
