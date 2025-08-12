import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db, mongo } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const category = searchParams.get("category");

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
        ticketSystem: true,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    if (!server.ticketSystem) {
      return new NextResponse("Ticket system not found", { status: 404 });
    }

    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    // Build where clause based on user role and filters
    let whereClause: any = {
      ticketSystemId: server.ticketSystem.id,
    };

    // If user is not admin/moderator, only show their own tickets
    if (member.role === MemberRole.GUEST) {
      whereClause.requesterProfileId = profile.id;
    }

    // Add filters
    if (status) {
      whereClause.status = status;
    }
    if (priority) {
      whereClause.priority = priority;
    }
    if (category) {
      whereClause.category = category;
    }

    const tickets = await db.ticket.findMany({
      where: whereClause,
      include: {
        requesterProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        assignedProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          include: {
            senderProfile: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("[TICKETS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

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

    const body = await req.json();
    const { title, description, priority, category } = body;

    if (!title || !description) {
      return new NextResponse("Title and description are required", { status: 400 });
    }

    // Check if user has exceeded max open tickets
    const openTicketsCount = await db.ticket.count({
      where: {
        requesterProfileId: profile.id,
        ticketSystemId: server.ticketSystem.id,
        status: {
          in: ["OPEN", "IN_PROGRESS", "WAITING_FOR_USER"],
        },
      },
    });

    if (openTicketsCount >= server.ticketSystem.maxOpenTickets) {
      return new NextResponse(`You can only have ${server.ticketSystem.maxOpenTickets} open tickets at a time`, { status: 400 });
    }

    // Generate ticket number
    const lastTicket = await db.ticket.findFirst({
      where: {
        ticketSystemId: server.ticketSystem.id,
      },
      orderBy: {
        ticketNumber: "desc",
      },
    });

    let ticketNumber = "TICKET-001";
    if (lastTicket) {
      const lastNumber = parseInt(lastTicket.ticketNumber.split("-")[1]);
      ticketNumber = `TICKET-${String(lastNumber + 1).padStart(3, "0")}`;
    }

    // Create the ticket
    const ticket = await db.ticket.create({
      data: {
        ticketNumber,
        title,
        description,
        status: "OPEN",
        priority: priority || "MEDIUM",
        category: category || "GENERAL",
        requesterProfileId: profile.id,
        serverId,
        ticketSystemId: server.ticketSystem.id,
        lastActivity: new Date(),
      },
      include: {
        requesterProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    // Post notification to the designated channel
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
          await mongo.message.create({
            data: {
              content: `🎫 **New Support Ticket Created**\n\n**Ticket:** ${ticket.ticketNumber}\n**Title:** ${ticket.title}\n**Priority:** ${ticket.priority}\n**Category:** ${ticket.category}\n**Requested by:** ${ticket.requesterProfile.name}\n\n${server.ticketSystem.welcomeMessage || "Please be patient while we assist you."}`,
              channelId: server.ticketSystem.channel.id,
              memberId: member.id,
            },
          });
          console.log("Message created successfully");
        }
      } catch (error) {
        console.error("Failed to post ticket notification to channel:", error);
        // Don't fail the ticket creation if channel posting fails
      }
    } else {
      console.log("No channel found for ticket system");
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("[TICKETS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
