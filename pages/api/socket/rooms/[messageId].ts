import { currentProfilePages } from "@/lib/current-profile-pages";
import { postgres, mongo } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const profile = await currentProfilePages(req);
    const { messageId, roomId } = req.query;
    const { content } = req.body;
    
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!roomId) {
      return res.status(400).json({ error: "Room ID missing" });
    }
    if (!messageId) {
      return res.status(400).json({ error: "Message ID missing" });
    }

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

      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }

      let directMessage = await mongo.directMessage.findFirst({
        where: {
          id: messageId as string,
          conversationId: roomId as string,
        },
      });

      if (!directMessage || directMessage.deleted) {
        return res.status(404).json({ error: "Message not found" });
      }

      const isMessageOwner = directMessage.memberId === member.id;
      const isAdmin = member.role === MemberRole.ADMIN;
      const isModerator = member.role === MemberRole.MODERATOR;
      const canModify = isMessageOwner || isAdmin || isModerator;

      if (!canModify) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (req.method === "DELETE") {
        directMessage = await mongo.directMessage.update({
          where: {
            id: messageId as string,
          },
          data: {
            fileUrl: null,
            content: "This message has been deleted",
            deleted: true,
          },
        });
      }

      if (req.method === "PATCH") {
        if (!isMessageOwner) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        directMessage = await mongo.directMessage.update({
          where: {
            id: messageId as string,
          },
          data: {
            content,
          },
        });
      }

      const directMessageWithMember = {
        ...directMessage,
        member: member,
      };

      const updateKey = `chat:${conversation.id}:messages:update`;
      (res.socket as any).server.io.emit(updateKey, directMessageWithMember);
      return res.status(200).json(directMessageWithMember);
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

      let groupMessage = await mongo.groupMessage.findFirst({
        where: {
          id: messageId as string,
          groupConversationId: roomId as string,
        },
      });

      if (!groupMessage || groupMessage.deleted) {
        return res.status(404).json({ error: "Message not found" });
      }

      const isMessageOwner = groupMessage.memberId === currentMember.memberId;
      const isAdmin = currentMember.role === "ADMIN";
      const isModerator = currentMember.role === "MODERATOR";
      const canModify = isMessageOwner || isAdmin || isModerator;

      if (!canModify) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (req.method === "DELETE") {
        groupMessage = await mongo.groupMessage.update({
          where: {
            id: messageId as string,
          },
          data: {
            fileUrl: null,
            content: "This message has been deleted",
            deleted: true,
          },
        });
      }

      if (req.method === "PATCH") {
        if (!isMessageOwner) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        groupMessage = await mongo.groupMessage.update({
          where: {
            id: messageId as string,
          },
          data: {
            content,
          },
        });
      }

      const groupMessageWithMember = {
        ...groupMessage,
        member: currentMember.member,
      };

      const updateKey = `chat:${groupConversation.id}:messages:update`;
      (res.socket as any).server.io.emit(updateKey, groupMessageWithMember);
      return res.status(200).json(groupMessageWithMember);
    }

    return res.status(404).json({ error: "Room not found" });
  } catch (error) {
    console.log("[MESSAGE_ID]", error);
    return res.status(500).json({ message: "Internal error" });
  }
} 