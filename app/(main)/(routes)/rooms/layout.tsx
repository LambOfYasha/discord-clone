import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DmRoomSidebar } from "@/components/chat/dm-room-sidebar";

export default async function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await currentProfile();

  if (!profile) {
    const authInstance = await auth();
    return authInstance.redirectToSignIn();
  }

  return (
    <div className="h-full flex">
      <div className="sidebar md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <DmRoomSidebar profile={profile} />
      </div>
      <main className="h-full md:pl-60 flex-1">
        {children}
      </main>
    </div>
  );
} 