import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AnnouncementsList } from "@/components/announcements/announcements-list";

const AnnouncementsPage = async ({
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
  if (!member) {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Scheduled Announcements
          </h1>
        </div>
        <div className="flex-1 p-6">
          <AnnouncementsList 
            serverId={serverId}
            member={member}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
