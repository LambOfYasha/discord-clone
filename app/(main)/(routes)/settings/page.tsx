import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
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
              Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your application settings and preferences.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use the theme toggle in the navigation sidebar to change your theme preference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 