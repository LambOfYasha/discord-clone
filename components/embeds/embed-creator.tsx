"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Plus, Trash2, Eye, Save, Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EmbedPreview } from "./embed-preview";
import { Channel } from "@prisma/generated/postgres";

interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

interface EmbedData {
  title: string;
  description: string;
  url: string;
  color: string;
  imageUrl: string;
  thumbnailUrl: string;
  authorName: string;
  authorUrl: string;
  authorIconUrl: string;
  footerText: string;
  footerIconUrl: string;
  timestamp: string;
  channelId: string;
  fields: EmbedField[];
  // Scheduling fields
  isScheduled: boolean;
  scheduledDate: string;
  scheduledTime: string;
  repeatType: "none" | "daily" | "weekly" | "monthly";
  repeatDays: string[];
}

interface EmbedCreatorProps {
  serverId: string;
  channels: Channel[];
}

export const EmbedCreator = ({ serverId, channels }: EmbedCreatorProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const [embedData, setEmbedData] = useState<EmbedData>({
    title: "",
    description: "",
    url: "",
    color: "#5865F2",
    imageUrl: "",
    thumbnailUrl: "",
    authorName: "",
    authorUrl: "",
    authorIconUrl: "",
    footerText: "",
    footerIconUrl: "",
    timestamp: "",
    channelId: "",
    fields: [],
    // Scheduling defaults
    isScheduled: false,
    scheduledDate: "",
    scheduledTime: "",
    repeatType: "none",
    repeatDays: [],
  });

  const addField = () => {
    const newField: EmbedField = {
      id: Date.now().toString(),
      name: "",
      value: "",
      inline: false,
    };
    setEmbedData(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  const removeField = (fieldId: string) => {
    setEmbedData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
    }));
  };

  const updateField = (fieldId: string, field: Partial<EmbedField>) => {
    setEmbedData(prev => ({
      ...prev,
      fields: prev.fields.map(f => 
        f.id === fieldId ? { ...f, ...field } : f
      ),
    }));
  };

  const handleSave = async () => {
    if (!embedData.channelId) {
      toast.error("Please select a channel for your embed");
      return;
    }

    if (!embedData.title && !embedData.description && embedData.fields.length === 0) {
      toast.error("Please add at least a title, description, or field to your embed");
      return;
    }

    if (embedData.isScheduled && (!embedData.scheduledDate || !embedData.scheduledTime)) {
      toast.error("Please select both date and time for scheduled embed");
      return;
    }

    if (embedData.isScheduled && embedData.repeatType === "weekly" && embedData.repeatDays.length === 0) {
      toast.error("Please select at least one day for weekly repeat");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/servers/${serverId}/embeds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...embedData,
          timestamp: embedData.timestamp ? new Date(embedData.timestamp).toISOString() : null,
          // Include scheduling data
          isScheduled: embedData.isScheduled,
          scheduledDate: embedData.isScheduled ? embedData.scheduledDate : null,
          scheduledTime: embedData.isScheduled ? embedData.scheduledTime : null,
          repeatType: embedData.isScheduled ? embedData.repeatType : "none",
          repeatDays: embedData.isScheduled ? embedData.repeatDays : [],
        }),
      });

      if (response.ok) {
        const embed = await response.json();
        toast.success("Embed created successfully!");
        router.push(`/servers/${serverId}/embeds/${embed.id}`);
      } else {
        const error = await response.text();
        toast.error(error || "Failed to create embed");
      }
    } catch (error) {
      console.error("Error creating embed:", error);
      toast.error("Failed to create embed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Embed Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <select
                id="channel"
                value={embedData.channelId}
                onChange={(e) => setEmbedData(prev => ({ ...prev, channelId: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a channel</option>
                {channels.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    #{channel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Embed title"
                value={embedData.title}
                onChange={(e) => setEmbedData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Embed description"
                value={embedData.description}
                onChange={(e) => setEmbedData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={embedData.url}
                onChange={(e) => setEmbedData(prev => ({ ...prev, url: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={embedData.color}
                  onChange={(e) => setEmbedData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={embedData.color}
                  onChange={(e) => setEmbedData(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#5865F2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.png"
                value={embedData.imageUrl}
                onChange={(e) => setEmbedData(prev => ({ ...prev, imageUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                type="url"
                placeholder="https://example.com/thumbnail.png"
                value={embedData.thumbnailUrl}
                onChange={(e) => setEmbedData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Author</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input
                id="authorName"
                placeholder="Author name"
                value={embedData.authorName}
                onChange={(e) => setEmbedData(prev => ({ ...prev, authorName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorUrl">Author URL</Label>
              <Input
                id="authorUrl"
                type="url"
                placeholder="https://example.com"
                value={embedData.authorUrl}
                onChange={(e) => setEmbedData(prev => ({ ...prev, authorUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorIconUrl">Author Icon URL</Label>
              <Input
                id="authorIconUrl"
                type="url"
                placeholder="https://example.com/icon.png"
                value={embedData.authorIconUrl}
                onChange={(e) => setEmbedData(prev => ({ ...prev, authorIconUrl: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="footerText">Footer Text</Label>
              <Input
                id="footerText"
                placeholder="Footer text"
                value={embedData.footerText}
                onChange={(e) => setEmbedData(prev => ({ ...prev, footerText: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footerIconUrl">Footer Icon URL</Label>
              <Input
                id="footerIconUrl"
                type="url"
                placeholder="https://example.com/icon.png"
                value={embedData.footerIconUrl}
                onChange={(e) => setEmbedData(prev => ({ ...prev, footerIconUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timestamp">Timestamp</Label>
              <Input
                id="timestamp"
                type="datetime-local"
                value={embedData.timestamp}
                onChange={(e) => setEmbedData(prev => ({ ...prev, timestamp: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isScheduled"
                checked={embedData.isScheduled}
                onChange={(e) => setEmbedData(prev => ({ ...prev, isScheduled: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isScheduled">Schedule this embed</Label>
            </div>

            {embedData.isScheduled && (
              <div className="space-y-4 pl-6 border-l-2 border-zinc-200 dark:border-zinc-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Date</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={embedData.scheduledDate}
                      onChange={(e) => setEmbedData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduledTime">Time</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={embedData.scheduledTime}
                      onChange={(e) => setEmbedData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repeatType">Repeat</Label>
                  <select
                    id="repeatType"
                    value={embedData.repeatType}
                    onChange={(e) => setEmbedData(prev => ({ 
                      ...prev, 
                      repeatType: e.target.value as "none" | "daily" | "weekly" | "monthly",
                      repeatDays: e.target.value === "none" ? [] : prev.repeatDays
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="none">No repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {embedData.repeatType === "weekly" && (
                  <div className="space-y-2">
                    <Label>Repeat on days</Label>
                    <div className="grid grid-cols-7 gap-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                        <div key={day} className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            id={`day-${index}`}
                            checked={embedData.repeatDays.includes(index.toString())}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEmbedData(prev => ({
                                  ...prev,
                                  repeatDays: [...prev.repeatDays, index.toString()]
                                }));
                              } else {
                                setEmbedData(prev => ({
                                  ...prev,
                                  repeatDays: prev.repeatDays.filter(d => d !== index.toString())
                                }));
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor={`day-${index}`} className="text-xs">{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {embedData.isScheduled && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Scheduled for:</strong> {embedData.scheduledDate && embedData.scheduledTime ? 
                        `${new Date(`${embedData.scheduledDate}T${embedData.scheduledTime}`).toLocaleString()}` : 
                        "Please select date and time"
                      }
                      {embedData.repeatType !== "none" && (
                        <span className="block mt-1">
                          <strong>Repeats:</strong> {embedData.repeatType === "daily" ? "Every day" :
                            embedData.repeatType === "weekly" ? `Every ${embedData.repeatDays.length > 0 ? 
                              embedData.repeatDays.map(d => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][parseInt(d)]).join(", ") : 
                              "week"}` :
                            "Every month"
                          }
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Fields
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addField}
                className="h-8"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {embedData.fields.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
                No fields added yet. Click "Add Field" to get started.
              </p>
            ) : (
              embedData.fields.map((field, index) => (
                <div key={field.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Field {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeField(field.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="Field name"
                      value={field.name}
                      onChange={(e) => updateField(field.id, { name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Textarea
                      placeholder="Field value"
                      value={field.value}
                      onChange={(e) => updateField(field.id, { value: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`inline-${field.id}`}
                      checked={field.inline}
                      onChange={(e) => updateField(field.id, { inline: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`inline-${field.id}`}>Inline</Label>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "Create Embed"}
          </Button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Live Preview</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
        </div>

        {showPreview && (
          <Card className="min-h-[400px]">
            <CardContent className="p-4">
              <EmbedPreview embed={embedData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
