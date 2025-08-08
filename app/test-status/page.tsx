"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/use-user-profile";

const TestStatusPage = () => {
  const { profile, updateProfile } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (status: string) => {
    setIsLoading(true);
    try {
      await updateProfile({ status });
      console.log("Status updated to:", status);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Status Test Page</h1>
      
      <div className="space-y-2">
        <p><strong>Current Status:</strong> {profile?.status || "Loading..."}</p>
        <p><strong>Profile ID:</strong> {profile?.id || "Loading..."}</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Test Status Updates:</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => handleStatusUpdate("ONLINE")}
            disabled={isLoading}
            variant="outline"
          >
            Set Online
          </Button>
          <Button 
            onClick={() => handleStatusUpdate("IDLE")}
            disabled={isLoading}
            variant="outline"
          >
            Set Idle
          </Button>
          <Button 
            onClick={() => handleStatusUpdate("DO_NOT_DISTURB")}
            disabled={isLoading}
            variant="outline"
          >
            Set Do Not Disturb
          </Button>
          <Button 
            onClick={() => handleStatusUpdate("INVISIBLE")}
            disabled={isLoading}
            variant="outline"
          >
            Set Invisible
          </Button>
        </div>
      </div>

      {isLoading && <p>Updating status...</p>}
    </div>
  );
};

export default TestStatusPage;
