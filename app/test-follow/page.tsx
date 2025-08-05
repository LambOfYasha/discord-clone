"use client";

import { useState, useEffect } from "react";
import { FollowButton } from "@/components/ui/follow-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestFollowPage() {
  const [testUser, setTestUser] = useState<any>(null);
  const [testServer, setTestServer] = useState<any>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [isFollowingServer, setIsFollowingServer] = useState(false);

  useEffect(() => {
    // Create a test user and server for testing
    setTestUser({
      id: "test-user-id",
      name: "Test User",
      imageUrl: "https://via.placeholder.com/150"
    });
    setTestServer({
      id: "test-server-id",
      name: "Test Server",
      imageUrl: "https://via.placeholder.com/150"
    });
  }, []);

  const handleUserFollowChange = (following: boolean) => {
    setIsFollowingUser(following);
    console.log("User follow status:", following);
  };

  const handleServerFollowChange = (following: boolean) => {
    setIsFollowingServer(following);
    console.log("Server follow status:", following);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Follow Feature Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Follow Test */}
        <Card>
          <CardHeader>
            <CardTitle>User Follow Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {testUser?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{testUser?.name}</h3>
                <p className="text-sm text-gray-500">Test User</p>
              </div>
            </div>
            
            <FollowButton
              type="user"
              targetId={testUser?.id || ""}
              isFollowing={isFollowingUser}
              onFollowChange={handleUserFollowChange}
            />
            
            <div className="mt-4 text-sm text-gray-600">
              Status: {isFollowingUser ? "Following" : "Not Following"}
            </div>
          </CardContent>
        </Card>

        {/* Server Follow Test */}
        <Card>
          <CardHeader>
            <CardTitle>Server Follow Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {testServer?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{testServer?.name}</h3>
                <p className="text-sm text-gray-500">Test Server</p>
              </div>
            </div>
            
            <FollowButton
              type="server"
              targetId={testServer?.id || ""}
              isFollowing={isFollowingServer}
              onFollowChange={handleServerFollowChange}
            />
            
            <div className="mt-4 text-sm text-gray-600">
              Status: {isFollowingServer ? "Following" : "Not Following"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. Click the Follow buttons to test the follow functionality</p>
          <p>2. Check the browser console for API responses</p>
          <p>3. Check the inbox modal for notifications</p>
          <p>4. Check the activity sidebar for followed users/servers</p>
        </div>
      </div>
    </div>
  );
} 