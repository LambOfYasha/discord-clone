import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SendMessageRequestButton } from "@/components/ui/send-message-request-button";

const TestMessageRequestsPage = async () => {
  // Check authentication first
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await currentProfile();
  if (!profile) {
    redirect("/setup");
  }

  // Get all profiles except the current user
  const allProfiles = await db.profile.findMany({
    where: {
      id: {
        not: profile.id,
      },
    },
    take: 10, // Limit to 10 for testing
  });

  return (
    <div className="h-full bg-[#313338] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Message Request Test Page
        </h1>
        
        <div className="bg-[#2B2D31] rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Your Profile
          </h2>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{profile.name}</p>
              <p className="text-sm text-gray-400">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2B2D31] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Send Message Requests to Other Users
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProfiles.map((targetProfile) => (
              <div
                key={targetProfile.id}
                className="bg-[#1E1F22] rounded-lg p-4 border border-[#2B2D31]"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {targetProfile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{targetProfile.name}</p>
                    <p className="text-xs text-gray-400">{targetProfile.email}</p>
                  </div>
                </div>
                
                <SendMessageRequestButton
                  targetProfile={{
                    id: targetProfile.id,
                    name: targetProfile.name,
                    imageUrl: targetProfile.imageUrl,
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {allProfiles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No other users found</p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-[#2B2D31] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            How to Test
          </h2>
          <div className="space-y-2 text-gray-300">
            <p>1. Click "Send Message" on any user card above</p>
            <p>2. Write a message and send the request</p>
            <p>3. Go to <a href="/message-requests" className="text-blue-400 hover:underline">Message Requests</a> to see pending requests</p>
            <p>4. Accept or reject the message requests</p>
            <p>5. When accepted, a direct message conversation will be created</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMessageRequestsPage; 