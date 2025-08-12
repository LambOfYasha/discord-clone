import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    console.log("Poll API route hit - starting debug");
    
    const profile = await currentProfile();
    console.log("Profile:", profile ? "Found" : "Not found");
    
    if (!profile) {
      console.log("No profile found - returning 401");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    
    const { question, options, expiresAt, allowMultipleVotes, apiUrl, query } = body;

    if (!question || !options || options.length < 2) {
      console.log("Validation failed");
      return new NextResponse("Invalid poll data", { status: 400 });
    }

    // Use channelId from query instead of extracting from apiUrl
    const channelId = query?.channelId;
    console.log("Channel ID from query:", channelId);

    if (!channelId) {
      console.log("No channel ID found - returning 400");
      return new NextResponse("Channel ID is required", { status: 400 });
    }

    // Get the member from PostgreSQL
    const member = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
        server: {
          channels: {
            some: {
              id: channelId,
            },
          },
        },
      },
    });

    console.log("Member:", member ? "Found" : "Not found");

    if (!member) {
      console.log("Member not found - returning 404");
      return new NextResponse("Member not found", { status: 404 });
    }

    console.log("All validations passed, creating poll...");

    // Create poll in PostgreSQL
    const poll = await postgres.poll.create({
      data: {
        question,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        allowMultipleVotes,
        options: {
          create: options.map((option: string) => ({
            text: option,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    // Create the message with poll reference
    const message = await postgres.message.create({
      data: {
        content: `📊 **${question}**\n\n${options.map((option: string, index: number) => `${index + 1}. ${option}`).join('\n')}`,
        memberId: member.id,
        channelId,
        pollId: poll.id,
      },
    });

    // Create poll in MongoDB as well
    const mongoPoll = await mongo.poll.create({
      data: {
        question,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        allowMultipleVotes,
        options: {
          create: options.map((option: string) => ({
            text: option,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    // Create message in MongoDB
    await mongo.message.create({
      data: {
        content: `📊 **${question}**\n\n${options.map((option: string, index: number) => `${index + 1}. ${option}`).join('\n')}`,
        memberId: member.id,
        channelId,
        pollId: mongoPoll.id,
      },
    });

    console.log("Poll created successfully");
    return NextResponse.json({ poll, message });
  } catch (error) {
    console.error("[POLLS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
