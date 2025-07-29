import { v4 as uuidv4 } from "uuid";
import { initialProfile } from "@/lib/initial.profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@/prisma/generated/postgres";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    console.log("Creating server with:", { name, imageUrl });
    
    const profile = await initialProfile();
    console.log("Current profile:", profile);
    
    if (!profile) {
      console.log("No profile found - user not authenticated");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await postgres.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error: unknown) {
    console.error("Server creation error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(message, { status: 500 });
  }
}
