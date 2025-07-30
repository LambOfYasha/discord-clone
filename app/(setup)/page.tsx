import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial.profile";
import SetupPageClient from "@/components/setup/setup-page-client";

const SetupPage = async () => {
  try {
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
  } catch (error) {
    console.error("Error in SetupPage:", error);
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">There was an error loading the page. Please try refreshing.</p>
          <pre className="mt-4 text-xs text-gray-500 bg-gray-100 p-2 rounded">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </div>
      </div>
    );
  }
};

export default SetupPage;
