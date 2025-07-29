import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial.profile";
import SetupPageClient from "@/components/setup/setup-page-client";

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

  return <SetupPageClient servers={servers} />;
};

export default SetupPage;
