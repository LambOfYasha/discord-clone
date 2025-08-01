"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestFriendRequest() {
  const [targetProfileId, setTargetProfileId] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testFriendRequest = async () => {
    if (!targetProfileId.trim()) {
      setResult("Please enter a target profile ID");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      console.log("Testing friend request to:", targetProfileId);
      
      const response = await fetch("/api/friend-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetProfileId: targetProfileId.trim(),
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        setResult(`Success! Response: ${responseText}`);
      } else {
        setResult(`Error (${response.status}): ${responseText}`);
      }
    } catch (error) {
      console.error("Test failed:", error);
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testCurrentUser = async () => {
    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/current-user");
      const responseText = await response.text();
      
      if (response.ok) {
        setResult(`Current user: ${responseText}`);
      } else {
        setResult(`Current user error (${response.status}): ${responseText}`);
      }
    } catch (error) {
      setResult(`Current user error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Friend Request</h1>
      
      <div className="space-y-4">
        <Button onClick={testCurrentUser} disabled={isLoading}>
          Test Current User
        </Button>
        
        <div>
          <Input
            placeholder="Enter target profile ID"
            value={targetProfileId}
            onChange={(e) => setTargetProfileId(e.target.value)}
          />
        </div>
        
        <Button onClick={testFriendRequest} disabled={isLoading}>
          {isLoading ? "Testing..." : "Test Friend Request"}
        </Button>
        
        {result && (
          <div className="p-4 bg-gray-100 rounded">
            <pre className="text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 