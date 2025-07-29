import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MessageRequestsPageClient from "@/components/message-requests/message-requests-page-client";

const MessageRequestsPage = async () => {
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

  // Show the message requests interface with servers (if any)
  return <MessageRequestsPageClient servers={servers} />;
};

export default MessageRequestsPage; 