import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationSidebarClient } from "./navigation-sidebar-client";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/setup");
  }

  const servers = await db.server.findMany({
    where: {
      AND: [
        {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
        {
          name: {
            not: "Direct Messages", // Exclude DM server from navigation
          },
        },
      ],
    },
  });

  return <NavigationSidebarClient servers={servers} />;
};
