"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { Search, User } from "lucide-react";

export const CreateDmModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const isModalOpen = isOpen && type === "createDm";

  useEffect(() => {
    if (isModalOpen) {
      fetchUsers();
    }
  }, [isModalOpen]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch("/api/members");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDm = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
              const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            type: "dm",
            targetMemberId: selectedUser.id,
          }),
        });

      if (response.ok) {
        const room = await response.json();
        router.push(`/rooms/${room.id}`);
        onClose();
      } else {
        console.error("Failed to create DM room");
      }
    } catch (error) {
      console.error("Failed to create DM:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center font-bold">
            New Direct Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Start a conversation with someone
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search for a user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <ScrollArea className="max-h-60">
            <div className="space-y-2">
              {isLoadingUsers ? (
                <div className="text-center py-4 text-zinc-500">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-zinc-500">
                  No users found
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profile.imageUrl} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {user.profile.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.profile.email}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateDm}
              disabled={!selectedUser || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? "Creating..." : "Start Conversation"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 