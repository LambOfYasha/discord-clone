import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { EmbedEditor } from "@/components/embeds/embed-editor";

interface EmbedPageProps {
  params: {
    serverId: string;
    embedId: string;
  };
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const { serverId, embedId } = await params;

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
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
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

  const embed = await db.embed.findUnique({
    where: {
      id: embedId,
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
  });

  if (!embed) {
    return redirect(`/servers/${serverId}`);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Edit Embed
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Created by {embed.creatorProfile.name}
            </p>
          </div>
          <EmbedEditor 
            serverId={serverId} 
            embedId={embedId}
            initialData={embed}
            channels={server.channels}
          />
        </div>
      </div>
    </div>
  );
}
