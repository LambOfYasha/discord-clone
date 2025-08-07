import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import FriendsPageClient from "@/components/friends/friends-page-client";

const FriendsPage = async () => {
  // Check authentication first
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // Get the current profile
  const profile = await currentProfile();
  
  // If no profile exists, redirect to setup
  if (!profile) {
    redirect("/setup");
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