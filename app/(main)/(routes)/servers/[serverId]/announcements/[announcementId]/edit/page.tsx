import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EditAnnouncementForm } from "@/components/announcements/edit-announcement-form";

const EditAnnouncementPage = async ({
  params,
}: {
  params: Promise<{ serverId: string; announcementId: string }>;
}) => {
  const { serverId, announcementId } = await params;
  
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
  if (!member) {
    return redirect("/");
  }

  const announcement = await db.scheduledAnnouncement.findUnique({
    where: {
      id: announcementId,
    },
    include: {
      server: true,
      channel: true,
      creatorProfile: true,
    },
  });

  if (!announcement) {
    return redirect(`/servers/${serverId}/announcements`);
  }

  // Check permissions
  if (member.role === "GUEST" && announcement.creatorProfileId !== profile.id) {
    return redirect(`/servers/${serverId}/announcements`);
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Edit Scheduled Announcement
          </h1>
        </div>
        <div className="flex-1 p-6">
          <EditAnnouncementForm 
            server={server}
            channels={server.channels}
            member={member}
            announcement={announcement}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementPage;
