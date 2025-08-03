"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { Search, User, X, Users, Plus } from "lucide-react";

export const CreateGroupDmModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [groupName, setGroupName] = useState("");

  const isModalOpen = isOpen && type === "createGroupDm";

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
    !selectedUsers.find(selected => selected.id === user.id) &&
    (user.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.profile.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleUserSelect = (user: any) => {
    setSelectedUsers(prev => [...prev, user]);
    setSearchQuery("");
  };

  const handleUserRemove = (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleCreateGroupDm = async () => {
    if (selectedUsers.length === 0) return;

    setIsLoading(true);
    try {
              const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            type: "group",
            memberIds: selectedUsers.map(user => user.id),
            name: groupName || `Group DM (${selectedUsers.length + 1})`,
          }),
        });

      if (response.ok) {
        const room = await response.json();
        router.push(`/rooms/${room.id}`);
        onClose();
      } else {
        console.error("Failed to create group room");
      }
    } catch (error) {
      console.error("Failed to create group DM:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center font-bold">
            New Group DM
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Start a group conversation with multiple people
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          {/* Group Name Input */}
          <div className="mb-4">
            <Input
              placeholder="Group name (optional)"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mb-2"
            />
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-zinc-700 mb-2">Selected Users ({selectedUsers.length})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <Badge key={user.id} variant="secondary" className="flex items-center gap-1">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={user.profile.imageUrl} />
                      <AvatarFallback>
                        <User className="h-2 w-2" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{user.profile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleUserRemove(user.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* User Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search for users to add..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Available Users */}
          <ScrollArea className="max-h-60">
            <div className="space-y-2">
              {isLoadingUsers ? (
                <div className="text-center py-4 text-zinc-500">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-zinc-500">
                  {searchQuery ? "No users found" : "No more users to add"}
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    onClick={() => handleUserSelect(user)}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
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
              onClick={handleCreateGroupDm}
              disabled={selectedUsers.length === 0 || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? "Creating..." : `Create Group (${selectedUsers.length})`}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 