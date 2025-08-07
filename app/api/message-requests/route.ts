import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get pending message requests (received by current user)
    const pendingRequests = await postgres.messageRequest.findMany({
      where: {
        targetProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        requesterProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get sent message requests (sent by current user)
    const sentRequests = await postgres.messageRequest.findMany({
      where: {
        requesterProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        targetProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      pending: pendingRequests,
      sent: sentRequests,
    });
  } catch (error) {
    console.log("[MESSAGE_REQUESTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();
    const { targetProfileId, message } = body;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!targetProfileId) {
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    if (!message || message.trim().length === 0) {
      return new NextResponse("Message content missing", { status: 400 });
    }

    if (profile.id === targetProfileId) {
      return new NextResponse("Cannot send message request to yourself", { status: 400 });
    }

    // Check if target profile exists
    const targetProfile = await postgres.profile.findUnique({
      where: {
        id: targetProfileId,
      },
    });

    if (!targetProfile) {
      return new NextResponse("Target profile not found", { status: 404 });
    }

    // Check if message request already exists
    const existingRequest = await postgres.messageRequest.findFirst({
      where: {
        requesterProfileId: profile.id,
        targetProfileId: targetProfileId,
        status: "PENDING",
      },
    });

    if (existingRequest) {
      return new NextResponse("Message request already exists", { status: 409 });
    }

    // Create message request
    const messageRequest = await postgres.messageRequest.create({
      data: {
        requesterProfileId: profile.id,
        targetProfileId: targetProfileId,
        message: message.trim(),
        status: "PENDING",
      },
      include: {
        targetProfile: true,
      },
    });

    return NextResponse.json(messageRequest);
  } catch (error) {
    console.log("[MESSAGE_REQUESTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 