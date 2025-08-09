import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";

export async function DELETE(req: Request, { params }: { params: { eventId: string } }) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Server ID missing", { status: 400 });

    const server = await postgres.server.findUnique({
      where: { id: serverId },
      include: { members: true },
    });
    if (!server) return new NextResponse("Server not found", { status: 404 });
    const me = server.members.find((m) => m.profileId === profile.id);
    if (!me || ![MemberRole.ADMIN, MemberRole.MODERATOR].includes(me.role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await postgres.serverEvent.delete({ where: { id: params.eventId } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[EVENTS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



