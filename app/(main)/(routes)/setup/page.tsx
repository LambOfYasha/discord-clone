import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { postgres } from "@/lib/db";
import SetupPageClient from "@/components/setup/setup-page-client";

const SetupPage = async () => {
  try {
    console.log("SetupPage: Starting authentication check...");
    const { userId } = await auth();
    
    if (!userId) {
      console.log("SetupPage: No user found, redirecting to sign-in");
      redirect('/sign-in');
    }
    
    console.log("SetupPage: User authenticated, loading profile...");
    
    // Get or create profile
    let profile = await postgres.profile.findUnique({
      where: { userId },
    });
    
    if (!profile) {
      console.log("SetupPage: Creating new profile...");
      const user = await import("@clerk/nextjs/server").then(m => m.currentUser());
      if (!user) {
        console.log("SetupPage: No user data, redirecting to sign-in");
        redirect('/sign-in');
      }
      
      profile = await postgres.profile.create({
        data: {
          userId: user.id,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
          imageUrl: user.imageUrl || '',
          email: user.emailAddresses[0]?.emailAddress || '',
        },
      });
    }
    
    console.log("SetupPage: Profile loaded successfully:", profile.id);
    
    console.log("SetupPage: Starting to fetch servers...");
    const servers = await postgres.server.findMany({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });
    console.log("SetupPage: Servers fetched successfully:", servers.length);

    return <SetupPageClient servers={servers} />;
  } catch (error) {
    console.error("Error in SetupPage:", error);
    
    // If it's an authentication error, redirect to sign-in
    if (error instanceof Error && (error.message.includes('auth') || error.message.includes('unauthorized'))) {
      console.log("SetupPage: Authentication error, redirecting to sign-in");
      redirect('/sign-in');
    }
    
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
