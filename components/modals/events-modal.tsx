"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MemberRole } from "@/prisma/generated/postgres";

type ServerEventDto = {
  id: string;
  title: string;
  description?: string | null;
  type: string;
  otherLocationType?: string | null;
  voiceChannelId?: string | null;
  textChannelId?: string | null;
  externalUrl?: string | null;
  location?: string | null;
  scheduledStartTime: string;
  scheduledEndTime?: string | null;
};

export const EventsModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const params = useParams();
  const isModalOpen = isOpen && type === "eventsList";
  const [events, setEvents] = useState<ServerEventDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const role = data.role as MemberRole | undefined;

  useEffect(() => {
    if (!isModalOpen || !params?.serverId) return;
    if (typeof window !== "undefined") console.log("[EventsModal] open for server", params.serverId);
    setLoading(true);
    axios
      .get(`/api/events?serverId=${params.serverId}`)
      .then((res) => setEvents(res.data || []))
      .finally(() => setLoading(false));
  }, [isModalOpen, params?.serverId]);

  const handleDelete = async (eventId: string) => {
    if (!params?.serverId) return;
    setDeleting(eventId);
    try {
      await axios.delete(`/api/events/${eventId}?serverId=${params.serverId}`);
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-lg mx-auto">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold mb-2">Server events</DialogTitle>
          <DialogDescription className="text-center text-zinc-500 text-sm">
            Upcoming scheduled events
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-3">
          {loading && <div className="text-sm text-zinc-500">Loading...</div>}
          {!loading && events.length === 0 && (
            <div className="text-sm text-zinc-500">No events scheduled.</div>
          )}
          {!loading &&
            events.map((e) => (
              <div key={e.id} className="flex items-start justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">{e.title}</div>
                  <div className="text-xs text-zinc-500">
                    {format(new Date(e.scheduledStartTime), "PPpp")}
                    {e.scheduledEndTime ? ` - ${format(new Date(e.scheduledEndTime), "PPpp")}` : ""}
                  </div>
                  {e.description && (
                    <div className="text-sm text-zinc-600 mt-1 line-clamp-2">{e.description}</div>
                  )}
                </div>
                {(role === MemberRole.ADMIN || role === MemberRole.MODERATOR) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deleting === e.id}
                    onClick={() => handleDelete(e.id)}
                  >
                    {deleting === e.id ? "Deleting..." : "Delete"}
                  </Button>
                )}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};



