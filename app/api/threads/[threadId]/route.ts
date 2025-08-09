import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const profile = await currentProfile();
    const { name } = await req.json();
    const { threadId } = await Promise.resolve(context?.params ?? {});

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Thread name is required", { status: 400 });
    }

    if (!threadId) {
      return new NextResponse("Thread ID is required", { status: 400 });
    }

    // Verify the thread exists and user has access
    const thread = await db.thread.findFirst({
      where: {
        id: threadId,
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
        id: threadId,
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
  context: any
) {
  try {
    const profile = await currentProfile();
    const { threadId } = await Promise.resolve(context?.params ?? {});

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!threadId) {
      return new NextResponse("Thread ID is required", { status: 400 });
    }

    // Verify the thread exists and user has access
    const thread = await db.thread.findFirst({
      where: {
        id: threadId,
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
        threadId: threadId,
      },
    });

    // Delete thread from PostgreSQL
    await db.thread.delete({
      where: {
        id: threadId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[THREAD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
