import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { EmbedsList } from "@/components/embeds/embeds-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface EmbedsPageProps {
  params: {
    serverId: string;
  };
}

export default async function EmbedsPage({ params }: EmbedsPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const { serverId } = await params;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  if (!server) {
    return redirect("/");
  }

  const member = server.members.find(
    (member) => member.profileId === profile.id
  );

  if (!member || member.role === "GUEST") {
    return redirect(`/servers/${serverId}`);
  }

  const embeds = await db.embed.findMany({
    where: {
      serverId: serverId,
    },
    include: {
      creatorProfile: true,
      fields: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Server Embeds
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Manage rich embed messages for your server
              </p>
            </div>
            {member.role !== "GUEST" && (
              <Link href={`/servers/${serverId}/embeds/create`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Embed
                </Button>
              </Link>
            )}
          </div>
          <EmbedsList embeds={embeds} serverId={serverId} />
        </div>
      </div>
    </div>
  );
}
