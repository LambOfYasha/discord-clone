import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const profile = await currentProfile();
    const { name } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const params = await Promise.resolve(context?.params ?? {});

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Check if user has permission to update categories
    const server = await postgres.server.findFirst({
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
    });

    if (!server) {
      return new NextResponse("Access denied", { status: 403 });
    }

    const category = await postgres.category.update({
      where: {
        id: params.categoryId,
        serverId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const params = await Promise.resolve(context?.params ?? {});

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    // Check if user has permission to delete categories
    const server = await postgres.server.findFirst({
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
    });

    if (!server) {
      return new NextResponse("Access denied", { status: 403 });
    }

    // First, move all channels in this category to uncategorized (null categoryId)
    await postgres.channel.updateMany({
      where: {
        categoryId: params.categoryId,
        serverId,
      },
      data: {
        categoryId: null,
      },
    });

    // Then delete the category
    await postgres.category.delete({
      where: {
        id: params.categoryId,
        serverId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
