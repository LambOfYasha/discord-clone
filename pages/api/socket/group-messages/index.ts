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
    const { groupConversationId } = req.query;

    if (!profile) return res.status(401).json({ error: "Unauthorized" });
    if (!groupConversationId)
      return res.status(400).json({ error: "Group Conversation ID missing" });
    if (!content) return res.status(400).json({ error: "Content missing" });

    const groupConversation = await postgres.groupConversation.findFirst({
      where: {
        id: groupConversationId as string,
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

    if (!groupConversation) {
      return res.status(404).json({ message: "Group conversation not found" });
    }

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
        groupConversationId: groupConversationId as string,
        memberId: currentMember.memberId,
      },
    });

    const messageWithMember = {
      ...message,
      member: currentMember.member,
    };

    const channelKey = `chat:${groupConversationId}:messages`;
    if (res?.socket?.server?.io) {
      res.socket.server.io.emit(channelKey, messageWithMember);
    }

    return res.status(200).json({ message: messageWithMember });
  } catch (error) {
    console.error("[GROUP_MESSAGES_POST]", error);
    return res.status(500).json({ error: "Internal error" });
  }
} 