import { auth } from "@clerk/nextjs/server";
import { postgres } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  
  const profile = await postgres.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
};
