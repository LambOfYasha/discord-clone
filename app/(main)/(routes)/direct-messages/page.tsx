import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FriendsSidebar } from "@/components/friends/friends-sidebar";
import { DirectMessagesSidebar } from "@/components/friends/direct-messages-sidebar";
import { ActiveNowSidebar } from "@/components/friends/active-now-sidebar";
import { DirectMessagesList } from "@/components/friends/direct-messages-list";

const DirectMessagesPage = async () => {
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

  // If user has servers, redirect to the first one
  if (servers.length > 0) {
    return redirect(`/servers/${servers[0].id}`);
  }

  return (
    <div className="h-full flex">
      {/* Friends & Direct Messages Sidebar */}
      <div className="w-60 flex-shrink-0 bg-[#2B2D31] border-r border-[#1E1F22]">
        <div className="flex flex-col h-full">
          {/* Friends Section */}
          <FriendsSidebar />
          
          {/* Direct Messages Section */}
          <DirectMessagesSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#313338]">
        <DirectMessagesList />
      </div>

      {/* Active Now Sidebar */}
      <ActiveNowSidebar />
    </div>
  );
};

export default DirectMessagesPage; 