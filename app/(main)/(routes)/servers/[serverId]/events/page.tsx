import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ServerEventsPage({ params }: { params: Promise<{ serverId: string }> }) {
  const { serverId } = await params;
  const profile = await currentProfile();
  if (!profile) redirect("/sign-in");

  const events = await db.serverEvent.findMany({
    where: { serverId },
    orderBy: { scheduledStartTime: "asc" },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Events</h1>
        <Link href={`/servers/${serverId}/events/create`} className="text-indigo-600 hover:underline">
          Create Event
        </Link>
      </div>
      {events.length === 0 ? (
        <div className="text-sm text-zinc-500">No events scheduled.</div>
      ) : (
        <div className="space-y-2">
          {events.map((e) => (
            <div key={e.id} className="border rounded-md p-3">
              <div className="font-medium">{e.title}</div>
              <div className="text-xs text-zinc-500">{new Date(e.scheduledStartTime).toLocaleString()}</div>
              {e.description && <div className="text-sm text-zinc-600 mt-1">{e.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


