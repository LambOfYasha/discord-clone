"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export default function TestInviteModal() {
  const { onOpen } = useModal();

  const handleOpenInviteModal = () => {
    // Mock server data for testing
    const mockServer = {
      id: "test-server-id",
      name: "Test Server",
      inviteCode: "test123",
      imageUrl: "",
      members: [],
    };

    onOpen("invite", { server: mockServer });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Invite Modal Test</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to test the invite modal with friend selection feature.
        </p>
        <Button onClick={handleOpenInviteModal} className="bg-indigo-600 hover:bg-indigo-700">
          Open Invite Modal
        </Button>
      </div>
    </div>
  );
} 