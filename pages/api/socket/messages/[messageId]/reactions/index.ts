import { currentProfilePages } from "@/lib/current-profile-pages";
import { postgres, mongo } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { messageId, serverId, channelId } = req.query;
    const { emoji } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }
    if (!emoji) {
      return res.status(400).json({ error: "Emoji missing" });
    }

    const server = await postgres.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const channel = await postgres.channel.findFirst({
      where: { id: channelId as string, serverId: serverId as string },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const message = await mongo.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
    });

    if (!message || message.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (req.method === "POST") {
      // Add reaction
      const reaction = await mongo.reaction.create({
        data: {
          emoji,
          memberId: member.id,
          messageId: messageId as string,
        },
      });

      // Fetch member data for the reaction
      const memberWithProfile = await postgres.member.findUnique({
        where: {
          id: member.id,
        },
        include: {
          profile: true,
        },
      });

      const reactionWithMember = {
        ...reaction,
        member: memberWithProfile,
      };

      const updateKey = `chat:${channelId}:reactions:add`;
      (res.socket as any).server.io.emit(updateKey, reactionWithMember);
      return res.status(200).json(reactionWithMember);
    }

    if (req.method === "DELETE") {
      // Remove reaction
      const reaction = await mongo.reaction.deleteMany({
        where: {
          emoji,
          memberId: member.id,
          messageId: messageId as string,
        },
      });

      const updateKey = `chat:${channelId}:reactions:remove`;
      (res.socket as any).server.io.emit(updateKey, {
        messageId: messageId as string,
        emoji,
        memberId: member.id,
      });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("[REACTIONS]", error);
    return res.status(500).json({ message: "Internal error" });
  }
} 