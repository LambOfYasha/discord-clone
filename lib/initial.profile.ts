import { currentUser, auth } from "@clerk/nextjs/server";
import { postgres } from "@/lib/db";

export const initialProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      const authInstance = await auth();
      return authInstance.redirectToSignIn();
    }

    const profile = await postgres.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await postgres.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        status: "ONLINE",
      },
    });
    return newProfile;
  } catch (error) {
    console.error("Error in initialProfile:", error);
    throw error;
  }
};
