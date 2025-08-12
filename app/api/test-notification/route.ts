import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db, mongo } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID required", { status: 400 });
    }

    // Get the server with ticket system
    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        ticketSystem: {
          include: {
            channel: true,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    if (!server.ticketSystem || !server.ticketSystem.isActive) {
      return new NextResponse("Ticket system is not active", { status: 400 });
    }

    console.log("=== TESTING NOTIFICATION LOGIC (GET) ===");
    console.log("Server ticket system:", JSON.stringify(server.ticketSystem, null, 2));
    console.log("Checking if ticket system has channel:", !!server.ticketSystem.channel);
    
    if (server.ticketSystem.channel) {
      console.log("Channel found, attempting to post notification");
      try {
        // Get the first member for testing
        const member = await db.member.findFirst({
          where: {
            serverId: serverId,
          },
        });

        console.log("Member found:", !!member);
        if (member) {
          console.log("Creating message in channel:", server.ticketSystem.channel.id);
          
                     const testMessage = await mongo.message.create({
             data: {
               content: `🧪 **TEST NOTIFICATION (GET)**\n\nThis is a test message to verify the notification system is working.\n\n**Channel:** ${server.ticketSystem.channel.name}\n**Member:** ${member.id}`,
               channelId: server.ticketSystem.channel.id,
               memberId: member.id,
             },
           });
          
          console.log("Message created successfully:", testMessage.id);
          
          return NextResponse.json({
            success: true,
            message: "Test notification sent successfully",
            messageId: testMessage.id,
            channelId: server.ticketSystem.channel.id,
            memberId: member.id,
            ticketSystem: server.ticketSystem,
          });
        } else {
          return NextResponse.json({
            success: false,
            error: "No members found in server",
          });
        }
      } catch (error) {
        console.error("Failed to post test notification to channel:", error);
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      console.log("No channel found for ticket system");
      return NextResponse.json({
        success: false,
        error: "No channel found for ticket system",
      });
    }
  } catch (error) {
    console.error("[TEST_NOTIFICATION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID required", { status: 400 });
    }

    // Get the server with ticket system (same as ticket creation)
    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        ticketSystem: {
          include: {
            channel: true,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    if (!server.ticketSystem || !server.ticketSystem.isActive) {
      return new NextResponse("Ticket system is not active", { status: 400 });
    }

    console.log("=== TESTING NOTIFICATION LOGIC ===");
    console.log("Server ticket system:", JSON.stringify(server.ticketSystem, null, 2));
    console.log("Checking if ticket system has channel:", !!server.ticketSystem.channel);
    
    if (server.ticketSystem.channel) {
      console.log("Channel found, attempting to post notification");
      try {
        const member = await db.member.findFirst({
          where: {
            serverId: serverId,
            profileId: profile.id,
          },
        });

        console.log("Member found:", !!member);
        if (member) {
          console.log("Creating message in channel:", server.ticketSystem.channel.id);
          
                     const testMessage = await mongo.message.create({
             data: {
               content: `🧪 **TEST NOTIFICATION**\n\nThis is a test message to verify the notification system is working.\n\n**Test by:** ${profile.name}\n**Channel:** ${server.ticketSystem.channel.name}`,
               channelId: server.ticketSystem.channel.id,
               memberId: member.id,
             },
           });
          
          console.log("Message created successfully:", testMessage.id);
          
          return NextResponse.json({
            success: true,
            message: "Test notification sent successfully",
            messageId: testMessage.id,
            channelId: server.ticketSystem.channel.id,
            memberId: member.id,
          });
        } else {
          return NextResponse.json({
            success: false,
            error: "Member not found",
          });
        }
      } catch (error) {
        console.error("Failed to post test notification to channel:", error);
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      console.log("No channel found for ticket system");
      return NextResponse.json({
        success: false,
        error: "No channel found for ticket system",
      });
    }
  } catch (error) {
    console.error("[TEST_NOTIFICATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
