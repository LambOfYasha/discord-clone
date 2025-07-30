import { currentProfilePages } from "@/lib/current-profile-pages";
import { postgres, mongo } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";
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
    console.log("Pin request:", { messageId, serverId, channelId, method: req.method });

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
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

    // Only admins and moderators can pin messages
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    if (!isAdmin && !isModerator) {
      return res.status(401).json({ error: "Unauthorized" });
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
      // Pin message
      const updatedMessage = await mongo.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          pinned: true,
        },
      });

      // Fetch member data with profile for the updated message
      const memberWithProfile = await postgres.member.findUnique({
        where: {
          id: message.memberId,
        },
        include: {
          profile: true,
        },
      });

      const messageWithMember = {
        ...updatedMessage,
        member: memberWithProfile,
      };

      const updateKey = `chat:${channelId}:messages:pin`;
      (res.socket as any).server.io.emit(updateKey, messageWithMember);
      return res.status(200).json(messageWithMember);
    }

    if (req.method === "DELETE") {
      // Unpin message
      const updatedMessage = await mongo.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          pinned: false,
        },
      });

      // Fetch member data with profile for the updated message
      const memberWithProfile = await postgres.member.findUnique({
        where: {
          id: message.memberId,
        },
        include: {
          profile: true,
        },
      });

      const messageWithMember = {
        ...updatedMessage,
        member: memberWithProfile,
      };

      const updateKey = `chat:${channelId}:messages:unpin`;
      (res.socket as any).server.io.emit(updateKey, messageWithMember);
      return res.status(200).json(messageWithMember);
    }
  } catch (error) {
    console.log("[MESSAGE_PIN]", error);
    return res.status(500).json({ message: "Internal error" });
  }
} 