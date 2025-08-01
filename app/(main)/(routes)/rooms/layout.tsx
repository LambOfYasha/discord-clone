import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
    <div className="h-full">
      {children}
    </div>
  );
} 