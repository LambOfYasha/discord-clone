import { postgres, mongo } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

/**
 * Example utility functions demonstrating dual database usage
 * 
 * PostgreSQL (postgres client) handles:
 * - User profiles and authentication
 * - Server management
 * - Channel management
 * - Member management
 * - Conversations
 * 
 * MongoDB (mongo client) handles:
 * - Messages
 * - Direct messages
 */

export class DualDatabaseService {
  /**
   * Create a new server with initial channel and member
   */
  static async createServer(name: string, imageUrl: string) {
    const profile = await currentProfile();
    if (!profile) throw new Error("Unauthorized");

    return await postgres.server.create({
      data: {
        name,
        imageUrl,
        profileId: profile.id,
        inviteCode: crypto.randomUUID(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: "ADMIN" }],
        },
      },
    });
  }

  /**
   * Send a message in a channel
   */
  static async sendChannelMessage(channelId: string, content: string, fileUrl?: string) {
    const profile = await currentProfile();
    if (!profile) throw new Error("Unauthorized");

    // Verify channel exists and user is a member
    const channel = await postgres.channel.findFirst({
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

    if (!channel) throw new Error("Channel not found or access denied");

    // Create message in MongoDB
    return await mongo.message.create({
      data: {
        content,
        fileUrl,
        channelId,
        memberId: profile.id, // This should be the member ID, not profile ID
      },
    });
  }

  /**
   * Send a direct message
   */
  static async sendDirectMessage(conversationId: string, content: string, fileUrl?: string) {
    const profile = await currentProfile();
    if (!profile) throw new Error("Unauthorized");

    // Verify conversation exists and user is a participant
    const conversation = await postgres.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { memberOne: { profileId: profile.id } },
          { memberTwo: { profileId: profile.id } },
        ],
      },
    });

    if (!conversation) throw new Error("Conversation not found or access denied");

    // Get the member record for this user
    const member = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
        serverId: conversation.serverId,
      },
    });

    if (!member) throw new Error("Member not found");

    // Create direct message in MongoDB
    return await mongo.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId,
        memberId: member.id,
      },
    });
  }

  /**
   * Get messages for a channel with pagination
   */
  static async getChannelMessages(channelId: string, cursor?: string, limit = 10) {
    const profile = await currentProfile();
    if (!profile) throw new Error("Unauthorized");

    // Verify channel access
    const channel = await postgres.channel.findFirst({
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

    if (!channel) throw new Error("Channel not found or access denied");

    // Get messages from MongoDB
    const messages = await mongo.message.findMany({
      where: {
        channelId,
        deleted: false,
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  }

  /**
   * Get direct messages for a conversation
   */
  static async getDirectMessages(conversationId: string, cursor?: string, limit = 10) {
    const profile = await currentProfile();
    if (!profile) throw new Error("Unauthorized");

    // Verify conversation access
    const conversation = await postgres.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { memberOne: { profileId: profile.id } },
          { memberTwo: { profileId: profile.id } },
        ],
      },
    });

    if (!conversation) throw new Error("Conversation not found or access denied");

    // Get direct messages from MongoDB
    const messages = await mongo.directMessage.findMany({
      where: {
        conversationId,
        deleted: false,
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  }
} 