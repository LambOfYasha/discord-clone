import { currentProfilePages } from "@/lib/current-profile-pages";
import { postgres, mongo } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { roomId } = req.query;

    if (!profile) return res.status(401).json({ error: "Unauthorized" });
    if (!roomId) return res.status(400).json({ error: "Room ID missing" });
    if (!content) return res.status(400).json({ error: "Content missing" });

    // First check if it's a DM conversation
    let conversation = await postgres.conversation.findFirst({
      where: {
        id: roomId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          {
            memberTwo: {
              profileId: profile.id,
            },
          },
        ],
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
      // Handle DM message
      const member =
        conversation.memberOne.profileId === profile.id
          ? conversation.memberOne
          : conversation.memberTwo;

      if (!member) return res.status(404).json({ error: "Member not found" });

      const message = await mongo.directMessage.create({
        data: {
          content,
          fileUrl,
          conversationId: roomId as string,
          memberId: member.id,
        },
      });

      const messageWithMember = {
        ...message,
        member: member,
      };

      const channelKey = `chat:${roomId}:messages`;
      if (res?.socket?.server?.io) {
        res.socket.server.io.emit(channelKey, messageWithMember);
      }

      return res.status(200).json({ message: messageWithMember });
    }

    // Check if it's a group conversation
    const groupConversation = await postgres.groupConversation.findFirst({
      where: {
        id: roomId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: {
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    if (groupConversation) {
      // Handle group message
      const currentMember = groupConversation.members.find(
        member => member.profileId === profile.id
      );

      if (!currentMember) {
        return res.status(404).json({ error: "Member not found" });
      }

      const message = await mongo.groupMessage.create({
        data: {
          content,
          fileUrl,
          groupConversationId: roomId as string,
          memberId: currentMember.memberId,
        },
      });

      const messageWithMember = {
        ...message,
        member: currentMember.member,
      };

      const channelKey = `chat:${roomId}:messages`;
      if (res?.socket?.server?.io) {
        res.socket.server.io.emit(channelKey, messageWithMember);
      }

      return res.status(200).json({ message: messageWithMember });
    }

    return res.status(404).json({ error: "Room not found" });
  } catch (error) {
    console.error("[ROOMS_POST]", error);
    return res.status(500).json({ error: "Internal error" });
  }
} 