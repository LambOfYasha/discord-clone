import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID is required", { status: 400 });
    }

    // Verify the channel exists and user has access
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        server: {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    // Get threads for this channel
    const threads = await db.thread.findMany({
      where: {
        channelId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(threads);
  } catch (error) {
    console.error("[THREADS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();
    const { name, parentMessageId, channelId } = body;

    console.log("Thread API received:", {
      body,
      name,
      parentMessageId,
      channelId,
      profileId: profile?.id
    });

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      console.log("Thread name missing");
      return new NextResponse("Thread name is required", { status: 400 });
    }

    // Parent message ID is optional - threads can be created from scratch

    if (!channelId) {
      console.log("Channel ID missing");
      return new NextResponse("Channel ID is required", { status: 400 });
    }

    // Verify the channel exists and user has access
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        server: {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    // Create thread in PostgreSQL (backup)
    try {
      const thread = await db.thread.create({
        data: {
          name,
          channelId,
          parentMessageId,
          messageCount: 0,
        },
      });

      console.log("Thread created successfully:", thread);
      return NextResponse.json(thread);
    } catch (dbError) {
      console.error("Database error creating thread:", dbError);
      return new NextResponse("Failed to create thread in database", { status: 500 });
    }
  } catch (error) {
    console.error("[THREADS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
