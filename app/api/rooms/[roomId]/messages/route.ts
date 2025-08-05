import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo, withMongoFallback } from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Get messages for a room (DM or group)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = await params;
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

      // Get DM messages with MongoDB primary and PostgreSQL fallback
      let messagesQuery: any = {
        conversationId: roomId,
      };

      if (cursor) {
        messagesQuery.id = {
          $lt: cursor,
        };
      }

      const messages = await withMongoFallback(
        // MongoDB operation
        async () => {
          const mongoMessages = await mongo.directMessage.findMany({
            where: messagesQuery,
            take: limit,
            orderBy: {
              createdAt: "desc",
            },
          });

          // Get member data for all messages
          const memberIds = [...new Set(mongoMessages.map(msg => msg.memberId))];
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
          return mongoMessages.map(message => ({
            ...message,
            member: memberMap.get(message.memberId),
          }));
        },
        // PostgreSQL fallback
        async () => {
          let postgresQuery: any = {
            conversationId: roomId,
          };

          if (cursor) {
            postgresQuery.id = {
              lt: cursor,
            };
          }

          return await postgres.directMessage.findMany({
            where: postgresQuery,
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
        },
        "ROOM_MESSAGES_GET_DM"
      );

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

      // Get group messages from PostgreSQL (group messages stay in PostgreSQL)
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
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = await params;
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

      // Create DM message with MongoDB primary and PostgreSQL fallback
      const message = await withMongoFallback(
        // MongoDB operation
        async () => {
          const mongoMessage = await mongo.directMessage.create({
            data: {
              content,
              fileUrl,
              conversationId: roomId,
              memberId: currentMember.id,
            },
          });

          // Add member data to the response
          return {
            ...mongoMessage,
            member: currentMember,
          };
        },
        // PostgreSQL fallback
        async () => {
          return await postgres.directMessage.create({
            data: {
              content,
              fileUrl,
              conversationId: roomId,
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
        },
        "ROOM_MESSAGES_POST_DM"
      );

      return NextResponse.json(message);
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
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("Unauthorized")) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }
    
    return new NextResponse("Internal Error", { status: 500 });
  }
} 