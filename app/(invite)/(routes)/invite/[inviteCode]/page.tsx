import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Params = Promise<{ inviteCode: string }>;

interface InviteCodePageProps {
  params: Params;
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  try {
    const resolvedParams = await params; // Wait for the promise to resolve
    const { inviteCode } = resolvedParams; // Destructure the inviteCode

    console.log(`[INVITE] Processing invite code: ${inviteCode}`);

    const profile = await currentProfile();

    if (!profile) {
      console.log("[INVITE] No profile found, redirecting to sign in");
      const authInstance = await auth();
      authInstance.redirectToSignIn();
      return null; // This will not be rendered because of the redirection
    }

    console.log(`[INVITE] Profile found: ${profile.id} (${profile.name})`);

    if (!inviteCode) {
      console.log("[INVITE] No invite code provided, redirecting to home");
      return redirect("/"); // If no invite code is provided, redirect to home
    }

    // First, check if the server exists with the given invite code
    const server = await db.server.findUnique({
      where: {
        inviteCode: inviteCode,
      },
    });

    if (!server) {
      // If server doesn't exist, redirect to home or show an error
      console.error(`[INVITE] Server with invite code ${inviteCode} not found`);
      return redirect("/"); // Redirect to home if server doesn't exist
    }

    console.log(`[INVITE] Server found: ${server.name} (${server.id})`);

    // Check if user is already a member of this server
    const existingMember = await db.member.findFirst({
      where: {
        serverId: server.id,
        profileId: profile.id,
      },
    });

    if (existingMember) {
      console.log(`[INVITE] User is already a member of server ${server.name}`);
      return redirect(`/servers/${server.id}`); // Redirect if already a member
    }

    console.log(`[INVITE] Adding user ${profile.name} to server ${server.name}`);

    try {
      // Create a new member for the user
      const newMember = await db.member.create({
        data: {
          profileId: profile.id,
          serverId: server.id,
          role: "GUEST", // Default role for new members
        },
      });

      console.log(`[INVITE] Successfully created member: ${newMember.id}`);
      return redirect(`/servers/${server.id}`); // Redirect to the server if added successfully
    } catch (error) {
      console.error("[INVITE] Error creating member:", error);
      return redirect("/"); // Redirect to home on error
    }
  } catch (error) {
    console.error("[INVITE] Unexpected error:", error);
    return redirect("/"); // Redirect to home on any unexpected error
  }
};

export default InviteCodePage;
