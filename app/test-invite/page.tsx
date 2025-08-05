import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TestInvitePage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    const authInstance = await auth();
    authInstance.redirectToSignIn();
    return null;
  }

  // Get all servers to test with
  const servers = await db.server.findMany({
    include: {
      members: true
    }
  });

  if (servers.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">No servers found</h1>
        <p>Create a server first to test invite functionality.</p>
      </div>
    );
  }

  const testServer = servers[0]; // Use the first server for testing

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Invite Link Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Server Information</h2>
          <p><strong>Name:</strong> {testServer.name}</p>
          <p><strong>ID:</strong> {testServer.id}</p>
          <p><strong>Invite Code:</strong> {testServer.inviteCode}</p>
          <p><strong>Members:</strong> {testServer.members.length}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Test Links</h2>
          <div className="space-y-2">
            <p><strong>Invite URL:</strong> <code>/invite/{testServer.inviteCode}</code></p>
            <p><strong>Full URL:</strong> <code>http://localhost:3000/invite/{testServer.inviteCode}</code></p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Current User</h2>
          <p><strong>Profile ID:</strong> {profile.id}</p>
          <p><strong>Name:</strong> {profile.name}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Copy the invite URL above</li>
            <li>Open it in a new browser tab</li>
            <li>You should be redirected to the server if the invite works</li>
            <li>If you're already a member, you'll be redirected to the server</li>
            <li>If you're not a member, you'll be added as a member and redirected</li>
          </ol>
        </div>

        <div className="mt-6">
          <a 
            href={`/invite/${testServer.inviteCode}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Test Invite Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestInvitePage; 