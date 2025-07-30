import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";

const ProfilePage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Profile Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>
        <ProfileForm initialData={profile} />
      </div>
    </div>
  );
};

export default ProfilePage; 