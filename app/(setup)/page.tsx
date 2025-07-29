import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial.profile";
import { redirect } from "next/navigation";
import { FriendsSidebar } from "@/components/friends/friends-sidebar";
import { DirectMessagesSidebar } from "@/components/friends/direct-messages-sidebar";
import { ActiveNowSidebar } from "@/components/friends/active-now-sidebar";
import { FriendsList } from "@/components/friends/friends-list";

const SetupPage = async () => {
  const profile = await initialProfile();
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
  // Users can see their servers in the sidebar and navigate to them
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
        <FriendsList servers={servers} />
      </div>

      {/* Active Now Sidebar */}
      <ActiveNowSidebar />
    </div>
  );
};

export default SetupPage;
