import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Thread name is required", { status: 400 });
    }

    if (!params.threadId) {
      return new NextResponse("Thread ID is required", { status: 400 });
    }

    // Verify the thread exists and user has access
    const thread = await db.thread.findFirst({
      where: {
        id: params.threadId,
        channel: {
          server: {
            members: {
              some: {
                profileId: profile.id,
              },
            },
          },
        },
      },
    });

    if (!thread) {
      return new NextResponse("Thread not found", { status: 404 });
    }

    // Update thread in PostgreSQL
    const updatedThread = await db.thread.update({
      where: {
        id: params.threadId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedThread);
  } catch (error) {
    console.error("[THREAD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.threadId) {
      return new NextResponse("Thread ID is required", { status: 400 });
    }

    // Verify the thread exists and user has access
    const thread = await db.thread.findFirst({
      where: {
        id: params.threadId,
        channel: {
          server: {
            members: {
              some: {
                profileId: profile.id,
              },
            },
          },
        },
      },
    });

    if (!thread) {
      return new NextResponse("Thread not found", { status: 404 });
    }

    // Delete thread messages from MongoDB first
    const { mongo } = await import("@/lib/db");
    await mongo.message.deleteMany({
      where: {
        threadId: params.threadId,
      },
    });

    // Delete thread from PostgreSQL
    await db.thread.delete({
      where: {
        id: params.threadId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[THREAD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
