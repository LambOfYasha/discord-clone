import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";
import { DirectMessage } from "@/prisma/generated/mongo";
import { NextResponse } from "next/server";

// GET - Get messages for a room (DM or group)
export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = params;
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room ID missing", { status: 400 });
    }

    // Get current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!currentMember) {
      return new NextResponse("Current member not found", { status: 404 });
    }

    // Check if it's a DM conversation
    const conversation = await postgres.conversation.findUnique({
      where: {
        id: roomId,
      },
    });

    if (conversation) {
      // Check if current user is part of this conversation
      if (conversation.memberOneId !== currentMember.id && conversation.memberTwoId !== currentMember.id) {
        return new NextResponse("Access denied", { status: 403 });
      }

      // Get DM messages from MongoDB
      let messagesQuery: any = {
        conversationId: roomId,
      };

      if (cursor) {
        messagesQuery.id = {
          $lt: cursor,
        };
      }

      const messages = await mongo.directMessage.findMany({
        where: messagesQuery,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });

      let nextCursor = null;
      if (messages.length === limit) {
        nextCursor = messages[messages.length - 1].id;
      }

      return NextResponse.json({
        items: messages,
        nextCursor,
      });
    }

    // Check if it's a group conversation
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: {
          where: {
            profileId: profile.id,
          },
        },
      },
    });

    if (groupConversation) {
      // Check if current user is part of this group
      const isMember = groupConversation.members.length > 0;
      if (!isMember) {
        return new NextResponse("Access denied", { status: 403 });
      }

      // Get group messages from PostgreSQL
      let messagesQuery: any = {
        groupConversationId: roomId,
      };

      if (cursor) {
        messagesQuery.id = {
          lt: cursor,
        };
      }

      const messages = await postgres.groupMessage.findMany({
        where: messagesQuery,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });

      let nextCursor = null;
      if (messages.length === limit) {
        nextCursor = messages[messages.length - 1].id;
      }

      return NextResponse.json({
        items: messages,
        nextCursor,
      });
    }

    return new NextResponse("Room not found", { status: 404 });
  } catch (error) {
    console.log("[ROOM_MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST - Send a message to a room (DM or group)
export async function POST(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = params;
    const { content, fileUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room ID missing", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content missing", { status: 400 });
    }

    // Get current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!currentMember) {
      return new NextResponse("Current member not found", { status: 404 });
    }

    // Check if it's a DM conversation
    const conversation = await postgres.conversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (conversation) {
      // Check if current user is part of this conversation
      if (conversation.memberOneId !== currentMember.id && conversation.memberTwoId !== currentMember.id) {
        return new NextResponse("Access denied", { status: 403 });
      }

      // Create DM message in MongoDB
      const message = await mongo.directMessage.create({
        data: {
          content,
          fileUrl,
          conversationId: roomId,
          memberId: currentMember.id,
        },
      });

      // Add member data to the response
      const messageWithMember = {
        ...message,
        member: currentMember,
      };

      return NextResponse.json(messageWithMember);
    }

    // Check if it's a group conversation
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: {
          where: {
            profileId: profile.id,
          },
        },
      },
    });

    if (groupConversation) {
      // Check if current user is part of this group
      const isMember = groupConversation.members.length > 0;
      if (!isMember) {
        return new NextResponse("Access denied", { status: 403 });
      }

      // Create group message in PostgreSQL
      const message = await postgres.groupMessage.create({
        data: {
          content,
          fileUrl,
          groupConversationId: roomId,
          memberId: currentMember.id,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });

      return NextResponse.json(message);
    }

    return new NextResponse("Room not found", { status: 404 });
  } catch (error) {
    console.log("[ROOM_MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 