import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type, categoryId } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server ID missing ", { status: 400 });
    }
    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }
    const server = await postgres.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
            categoryId: categoryId || null,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNELS_POST]", error);
    console.error("Full error details:", error);
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Server ID missing ", { status: 400 });

    // Ensure user is a member of the server
    const server = await postgres.server.findFirst({
      where: {
        id: serverId,
        members: { some: { profileId: profile.id } },
      },
      include: { channels: true },
    });
    if (!server) return new NextResponse("Access denied", { status: 403 });

    return NextResponse.json(
      server.channels.map((c) => ({ id: c.id, name: c.name, type: c.type }))
    );
  } catch (error) {
    console.log("[CHANNELS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
