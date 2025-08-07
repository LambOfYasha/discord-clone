import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";
import { ServerCategory } from "@/prisma/generated/postgres";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let whereClause: any = {};

    // Filter by category if specified
    if (category && category !== "ALL") {
      whereClause.category = category as ServerCategory;
    }

    // Filter by search query if specified
    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          profile: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    // Get total count for pagination
    const totalCount = await postgres.server.count({
      where: whereClause,
    });

    // Get servers with filtering and pagination
    const servers = await postgres.server.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            members: true,
          },
        },
        profile: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      servers,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("[DISCOVERY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
