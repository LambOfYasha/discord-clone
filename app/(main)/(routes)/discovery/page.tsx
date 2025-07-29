import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DiscoveryPageClient from "@/components/discovery/discovery-page-client";

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
  return <DiscoveryPageClient servers={servers} />;
};

export default DiscoveryPage; 