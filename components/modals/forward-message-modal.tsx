"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/hooks/use-modal-store";
import { Search, User } from "lucide-react";
import { useRouter } from "next/navigation";

export const ForwardMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const isModalOpen = isOpen && type === "forwardMessage";

  useEffect(() => {
    if (isModalOpen) {
      fetchUsers();
    }
  }, [isModalOpen]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch("/api/members");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.error("Failed to fetch users", e);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return users.filter((u) =>
      u.profile.name.toLowerCase().includes(q) || u.profile.email.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const handleForward = async () => {
    if (!selected) return;
    if (!data?.forwardMessage) return;
    setIsForwarding(true);
    try {
      // Ensure or create DM room with selected member
      const roomRes = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "dm", targetMemberId: selected.id }),
      });
      if (!roomRes.ok) {
        console.error("Failed to ensure DM room");
        return;
      }
      const room = await roomRes.json();

      // Send forwarded message into that room via socket rooms API
      const sendRes = await fetch(`/api/socket/rooms?roomId=${encodeURIComponent(room.id)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data.forwardMessage.content, fileUrl: data.forwardMessage.fileUrl || null }),
      });
      if (!sendRes.ok) {
        console.error("Failed to send forwarded message");
        return;
      }

      // Navigate to the DM room
      router.push(`/rooms/${room.id}`);
      onClose();
    } catch (e) {
      console.error("Forward failed", e);
    } finally {
      setIsForwarding(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center font-bold">Forward message</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Choose who to forward this message to
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <ScrollArea className="max-h-60">
            <div className="space-y-2">
              {isLoadingUsers ? (
                <div className="text-center py-4 text-zinc-500">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-zinc-500">No users found</div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selected?.id === user.id ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                    onClick={() => setSelected(user)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profile.imageUrl} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.profile.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.profile.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleForward} disabled={!selected || isForwarding} className="bg-indigo-600 hover:bg-indigo-700">
              {isForwarding ? "Forwarding..." : "Forward"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


