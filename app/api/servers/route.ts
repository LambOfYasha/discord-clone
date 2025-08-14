import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

// Cache configuration for static data
export const revalidate = 300; // 5 minutes
export const dynamic = 'force-dynamic'; // Override for user-specific data

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const servers = await postgres.server.findMany({
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(servers);
  } catch (error) {
    console.log("[SERVERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const server = await postgres.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: crypto.randomUUID(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: "ADMIN",
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
