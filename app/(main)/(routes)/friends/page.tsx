import { currentProfile } from "@/lib/current-profile";
import { initialProfile } from "@/lib/initial.profile";
import { db } from "@/lib/db";
import FriendsPageClient from "@/components/friends/friends-page-client";

const FriendsPage = async () => {
  // First try to get the current profile
  let profile = await currentProfile();
  
  // If no profile exists, try to create one
  if (!profile) {
    profile = await initialProfile();
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
  return <FriendsPageClient servers={servers} profile={profile} />;
};

export default FriendsPage; 