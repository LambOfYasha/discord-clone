import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FriendsSidebar } from "@/components/friends/friends-sidebar";
import { DirectMessagesSidebar } from "@/components/friends/direct-messages-sidebar";
import { ActiveNowSidebar } from "@/components/friends/active-now-sidebar";
import { ServerManagement } from "@/components/friends/server-management";

const DiscoveryPage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    const authInstance = await auth();
    return authInstance.redirectToSignIn();
  }

  // Get user's servers to redirect if they have any
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // Show the friends interface with servers (if any)
  return (
    <div className="h-full flex">
      {/* Friends & Direct Messages Sidebar */}
      <div className="w-60 flex-shrink-0 bg-[#2B2D31] border-r border-[#1E1F22]">
        <div className="flex flex-col h-full">
          {/* Friends Section */}
          <FriendsSidebar servers={servers} />
          
          {/* Direct Messages Section */}
          <DirectMessagesSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#313338]">
        <ServerManagement />
      </div>

      {/* Active Now Sidebar */}
      <ActiveNowSidebar />
    </div>
  );
};

export default DiscoveryPage; 