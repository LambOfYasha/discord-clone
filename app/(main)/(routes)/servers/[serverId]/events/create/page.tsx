"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EventType, OtherEventLocationType, ChannelType } from "@/prisma/generated/postgres";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type ChannelDto = { id: string; name: string; type: ChannelType };

export default function CreateServerEventPage() {
  const params = useParams();
  const router = useRouter();
  const serverId = (params as any)?.serverId as string;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<EventType>(EventType.VOICE);
  const [otherType, setOtherType] = useState<OtherEventLocationType | undefined>(undefined);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [voiceChannelId, setVoiceChannelId] = useState<string | undefined>(undefined);
  const [textChannelId, setTextChannelId] = useState<string | undefined>(undefined);
  const [externalUrl, setExternalUrl] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [channels, setChannels] = useState<ChannelDto[]>([]);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const voiceChannels = useMemo(() => channels.filter(c => c.type === ChannelType.AUDIO), [channels]);
  const textChannels = useMemo(() => channels.filter(c => c.type === ChannelType.TEXT), [channels]);

  useEffect(() => {
    if (!serverId) return;
    setLoadingChannels(true);
    axios.get(`/api/channels?serverId=${serverId}`)
      .then(res => setChannels(res.data || []))
      .catch(() => setChannels([]))
      .finally(() => setLoadingChannels(false));
  }, [serverId]);

  const submit = async () => {
    if (!serverId) return toast.error("Missing server context");
    if (!title) return toast.error("Enter a title");
    if (!start) return toast.error("Pick a start time");
    if (type === EventType.VOICE && !voiceChannelId) return toast.error("Select a voice channel");
    if (type === EventType.OTHER) {
      if (!otherType) return toast.error("Select a location type");
      if (otherType === OtherEventLocationType.TEXT_CHANNEL && !textChannelId) return toast.error("Select a text channel");
      if (otherType === OtherEventLocationType.EXTERNAL && !externalUrl) return toast.error("Enter an external link");
      if (otherType === OtherEventLocationType.LOCATION && !location) return toast.error("Enter a location");
    }

    setSubmitting(true);
    try {
      const url = `/api/events?serverId=${serverId}`;
      const payload: any = {
        title,
        description: description || undefined,
        type,
        otherLocationType: otherType,
        scheduledStartTime: start,
        scheduledEndTime: end || undefined,
      };
      if (type === EventType.VOICE) payload.voiceChannelId = voiceChannelId;
      if (type === EventType.OTHER) {
        if (otherType === OtherEventLocationType.TEXT_CHANNEL) payload.textChannelId = textChannelId;
        if (otherType === OtherEventLocationType.EXTERNAL) payload.externalUrl = externalUrl;
        if (otherType === OtherEventLocationType.LOCATION) payload.location = location;
      }
      await axios.post(url, payload);
      toast.success("Event created");
      router.push(`/servers/${serverId}/events`);
    } catch (e: any) {
      const msg = e?.response?.data || "Failed to create event";
      toast.error(typeof msg === "string" ? msg : "Failed to create event");
      console.error("Create event error:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/servers/${serverId}/events`} className="text-sm text-zinc-500 hover:underline">Back to events</Link>
        <h1 className="text-xl font-semibold">Create Event</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Community Hangout" />
        </div>
        <div>
          <label className="text-xs font-medium">Start time</label>
          <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional details" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium">Category</label>
          <Select value={type} onValueChange={(v) => setType(v as EventType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EventType.VOICE}>Voice channel</SelectItem>
              <SelectItem value={EventType.OTHER}>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {type === EventType.VOICE && (
          <div>
            <label className="text-xs font-medium">Voice channel</label>
            <Select value={voiceChannelId} onValueChange={setVoiceChannelId}>
              <SelectTrigger>
                <SelectValue placeholder={loadingChannels ? "Loading..." : "Select voice channel"} />
              </SelectTrigger>
              <SelectContent>
                {voiceChannels.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {type === EventType.OTHER && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium">Location type</label>
            <Select value={otherType} onValueChange={(v) => setOtherType(v as OtherEventLocationType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OtherEventLocationType.TEXT_CHANNEL}>Text channel</SelectItem>
                <SelectItem value={OtherEventLocationType.EXTERNAL}>External link</SelectItem>
                <SelectItem value={OtherEventLocationType.LOCATION}>Physical location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {otherType === OtherEventLocationType.TEXT_CHANNEL && (
            <div>
              <label className="text-xs font-medium">Text channel</label>
              <Select value={textChannelId} onValueChange={setTextChannelId}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingChannels ? "Loading..." : "Select text channel"} />
                </SelectTrigger>
                <SelectContent>
                  {textChannels.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {otherType === OtherEventLocationType.EXTERNAL && (
            <div>
              <label className="text-xs font-medium">External link</label>
              <Input value={externalUrl || ""} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://..." />
            </div>
          )}
          {otherType === OtherEventLocationType.LOCATION && (
            <div>
              <label className="text-xs font-medium">Location</label>
              <Input value={location || ""} onChange={(e) => setLocation(e.target.value)} placeholder="123 Main St" />
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={submit} disabled={submitting}>
          {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</>) : "Create Event"}
        </Button>
        <Link href={`/servers/${serverId}/events`} className="text-sm text-zinc-500 hover:underline self-center">Cancel</Link>
      </div>
    </div>
  );
}


