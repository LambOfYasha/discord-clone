"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import qs from "query-string";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventType, OtherEventLocationType, ChannelType } from "@/prisma/generated/postgres";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }).max(120),
    description: z.string().max(2000).optional(),
    type: z.nativeEnum(EventType),
    otherLocationType: z.nativeEnum(OtherEventLocationType).optional(),
    voiceChannelId: z.string().optional(),
    textChannelId: z.string().optional(),
    externalUrl: z.string().url().optional(),
    location: z.string().max(200).optional(),
    scheduledStartTime: z.string().min(1, { message: "Start time is required" }),
    scheduledEndTime: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === EventType.VOICE && !data.voiceChannelId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["voiceChannelId"],
        message: "Voice channel is required for voice events",
      });
    }
    if (data.type === EventType.OTHER) {
      if (!data.otherLocationType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["otherLocationType"],
          message: "Location type is required",
        });
      } else if (data.otherLocationType === OtherEventLocationType.TEXT_CHANNEL && !data.textChannelId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["textChannelId"],
          message: "Text channel is required",
        });
      } else if (data.otherLocationType === OtherEventLocationType.EXTERNAL && !data.externalUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["externalUrl"],
          message: "External link is required",
        });
      } else if (data.otherLocationType === OtherEventLocationType.LOCATION && !data.location) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["location"],
          message: "Location is required",
        });
      }
    }
  });

export const CreateEventModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const params = useParams();
  const router = useRouter();
  const isModalOpen = isOpen && type === "createEvent";
  const [channels, setChannels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const serverId = (data as any)?.server?.id || (params as any)?.serverId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: EventType.VOICE,
      otherLocationType: undefined,
      voiceChannelId: undefined,
      textChannelId: undefined,
      externalUrl: "",
      location: "",
      scheduledStartTime: "",
      scheduledEndTime: "",
    },
  });

  const voiceChannels = useMemo(() => channels.filter((c) => c.type === ChannelType.AUDIO), [channels]);
  const textChannels = useMemo(() => channels.filter((c) => c.type === ChannelType.TEXT), [channels]);

  useEffect(() => {
    if (!isModalOpen || !serverId) return;
    axios
      .get(`/api/channels?serverId=${serverId}`)
      .then((res) => setChannels(res.data || []))
      .catch(() => setChannels([]));
  }, [isModalOpen, serverId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      if (typeof window !== "undefined") {
        console.log("[CreateEventModal] open:", isModalOpen, "type:", type, "serverId:", serverId);
      }
      if (!serverId) {
        setError("Missing server context. Try reopening the modal from the server menu.");
        toast.error("Missing server context");
        return;
      }
      const url = qs.stringifyUrl({ url: "/api/events", query: { serverId } });
      const payload = {
        title: values.title,
        description: values.description || undefined,
        type: values.type,
        otherLocationType: values.otherLocationType || undefined,
        voiceChannelId: values.type === EventType.VOICE ? values.voiceChannelId : undefined,
        textChannelId:
          values.type === EventType.OTHER && values.otherLocationType === OtherEventLocationType.TEXT_CHANNEL
            ? values.textChannelId
            : undefined,
        externalUrl:
          values.type === EventType.OTHER && values.otherLocationType === OtherEventLocationType.EXTERNAL
            ? values.externalUrl
            : undefined,
        location:
          values.type === EventType.OTHER && values.otherLocationType === OtherEventLocationType.LOCATION
            ? values.location
            : undefined,
        scheduledStartTime: values.scheduledStartTime,
        scheduledEndTime: values.scheduledEndTime || undefined,
      };
      await axios.post(url, payload);
      toast.success("Event created");
      form.reset();
      onClose();
      router.refresh();
    } catch (err: any) {
      const msg = err?.response?.data || "Failed to create event";
      setError(typeof msg === "string" ? msg : "Failed to create event");
      toast.error(typeof msg === "string" ? msg : "Failed to create event");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const watchType = form.watch("type");
  const watchOtherType = form.watch("otherLocationType");

  const onInvalid = () => {
    toast.error("Please fix the errors and try again.");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-md mx-auto">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold mb-2">Create event</DialogTitle>
          <DialogDescription className="text-center text-zinc-500 text-sm">
            Schedule an event for your server
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <div className="px-6 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Community Hangout" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Optional details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EventType.VOICE}>Voice channel</SelectItem>
                        <SelectItem value={EventType.OTHER}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchType === EventType.VOICE && (
                <FormField
                  control={form.control}
                  name="voiceChannelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice channel</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a voice channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {voiceChannels.map((ch) => (
                            <SelectItem key={ch.id} value={ch.id}>
                              {ch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      {voiceChannels.length === 0 && (
                        <div className="text-xs text-zinc-500">No voice channels available in this server.</div>
                      )}
                    </FormItem>
                  )}
                />
              )}

              {watchType === EventType.OTHER && (
                <>
                  <FormField
                    control={form.control}
                    name="otherLocationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={OtherEventLocationType.TEXT_CHANNEL}>Text channel</SelectItem>
                            <SelectItem value={OtherEventLocationType.EXTERNAL}>External link</SelectItem>
                            <SelectItem value={OtherEventLocationType.LOCATION}>Physical location</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchOtherType === OtherEventLocationType.TEXT_CHANNEL && (
                    <FormField
                      control={form.control}
                      name="textChannelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text channel</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a text channel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {textChannels.map((ch) => (
                                <SelectItem key={ch.id} value={ch.id}>
                                  {ch.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {watchOtherType === OtherEventLocationType.EXTERNAL && (
                    <FormField
                      control={form.control}
                      name="externalUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {watchOtherType === OtherEventLocationType.LOCATION && (
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="scheduledStartTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="scheduledEndTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End time (optional)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {error && (
              <div className="px-6 -mt-4">
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">{error}</div>
              </div>
            )}
            <DialogFooter className="bg-gray-50 px-6 py-4">
              <div className="flex gap-3 w-full">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={form.formState.isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="flex-1"
                  disabled={form.formState.isSubmitting}
                  onClick={form.handleSubmit(onSubmit, onInvalid)}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...
                    </>
                  ) : (
                    "Create Event"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


