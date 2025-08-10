import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TestAnnouncementPage = async () => {
  // Check authentication first
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await currentProfile();
  if (!profile) {
    redirect("/setup");
  }

  // Get user's servers
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          type: "TEXT",
        },
      },
      scheduledAnnouncements: {
        include: {
          channel: true,
          creatorProfile: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Announcement System Test</h1>
      
      <div className="space-y-6">
        {servers.map((server) => (
          <div key={server.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{server.name}</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Text Channels:</h3>
              <ul className="list-disc list-inside space-y-1">
                {server.channels.map((channel) => (
                  <li key={channel.id}>{channel.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Scheduled Announcements:</h3>
              {server.scheduledAnnouncements.length === 0 ? (
                <p className="text-gray-500">No announcements</p>
              ) : (
                <ul className="space-y-2">
                  {server.scheduledAnnouncements.map((announcement) => (
                    <li key={announcement.id} className="border rounded p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{announcement.title}</h4>
                          <p className="text-sm text-gray-600">{announcement.message}</p>
                          <p className="text-xs text-gray-500">
                            Channel: {announcement.channel.name} | 
                            Schedule: {announcement.scheduleType} | 
                            Active: {announcement.isActive ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">
                          Next: {new Date(announcement.nextSendAt).toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4">
              <a 
                href={`/servers/${server.id}/announcements/create`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Announcement
              </a>
              <a 
                href={`/servers/${server.id}/announcements`}
                className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
              >
                View Announcements
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAnnouncementPage;
