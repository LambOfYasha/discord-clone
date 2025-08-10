import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CreateAnnouncementForm } from "@/components/announcements/create-announcement-form";

const CreateAnnouncementPage = async ({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) => {
  const { serverId } = await params;
  
  // Check authentication first
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await currentProfile();
  if (!profile) {
    redirect("/setup");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        where: {
          type: "TEXT",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        where: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const member = server.members[0];
  if (!member || member.role === "GUEST") {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Create Scheduled Announcement
          </h1>
        </div>
        <div className="flex-1 p-6">
          <CreateAnnouncementForm 
            server={server}
            channels={server.channels}
            member={member}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementPage;
