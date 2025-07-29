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
    const { conversationId } = req.query;

    if (!profile) return res.status(401).json({ error: "Unauthorized" });
    if (!conversationId)
      return res.status(400).json({ error: "Conversation ID missing" });
    if (!content) return res.status(400).json({ error: "Content missing" });
    const conversation = await postgres.conversation.findFirst({
      where: {
        id: conversationId as string,
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
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;
    if (!member) return res.status(404).json({ error: "Member not found" });

    const message = await mongo.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId: conversationId as string,
        memberId: member.id,
      },
    });

    const messageWithMember = {
      ...message,
      member: member,
    };

    const channelKey = `chat:${conversationId}:messages`;
    if (res?.socket?.server?.io) {
      res.socket.server.io.emit(channelKey, messageWithMember);
    }

    return res.status(200).json({ message: messageWithMember });
  } catch (error) {
    console.error("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ error: "Internal error" });
  }
}
