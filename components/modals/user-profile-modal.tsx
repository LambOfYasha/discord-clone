"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Settings, LogOut, Mail, Globe, ExternalLink, Users, Hash, Circle, Clock, MinusCircle, EyeOff } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserStatus } from "@/prisma/generated/postgres";
import { useClerk } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nickname: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  status: z.nativeEnum(UserStatus),
});

interface MutualServer {
  id: string;
  name: string;
  imageUrl: string;
  memberCount: number;
  role: string;
}

interface MutualFriend {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
}

export const UserProfileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { signOut } = useClerk();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mutualServers, setMutualServers] = useState<MutualServer[]>([]);
  const [mutualFriends, setMutualFriends] = useState<MutualFriend[]>([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const isModalOpen = isOpen && type === "userProfile";
  const { profile } = data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: profile?.nickname || "",
      bio: profile?.bio || "",
      website: profile?.website || "",
      status: (profile?.status as UserStatus) || UserStatus.ONLINE,
    },
  });

  useEffect(() => {
    if (profile) {
      // Get current user ID from auth or store it in localStorage
      const getCurrentUserId = async () => {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem("currentUserId", userData.userId);
            setIsCurrentUser(userData.userId === profile.userId);
          }
        } catch (error) {
          console.error("Failed to get current user:", error);
        }
      };
      
      getCurrentUserId();
      loadMutualData();
    }
  }, [profile]);

  const loadMutualData = async () => {
    if (!profile) return;
    try {
      const serversResponse = await axios.get(`/api/profiles/${profile.id}/mutual-servers`);
      setMutualServers(serversResponse.data);
      const friendsResponse = await axios.get(`/api/profiles/${profile.id}/mutual-friends`);
      setMutualFriends(friendsResponse.data);
    } catch (error) {
      console.error("Failed to load mutual data:", error);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isCurrentUser) return;
    try {
      setIsLoading(true);
      await axios.patch(`/api/profiles/${profile?.id}`, values);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ONLINE":
        return <Circle className="h-3 w-3 text-green-500" />;
      case "IDLE":
        return <Clock className="h-3 w-3 text-yellow-500" />;
      case "DO_NOT_DISTURB":
        return <MinusCircle className="h-3 w-3 text-red-500" />;
      case "INVISIBLE":
        return <EyeOff className="h-3 w-3 text-gray-500" />;
      default:
        return <Circle className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "text-green-500";
      case "IDLE":
        return "text-yellow-500";
      case "DO_NOT_DISTURB":
        return "text-red-500";
      case "INVISIBLE":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  if (!profile) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pt-6 px-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {isEditing ? "Edit Profile" : "User Profile"}
            </DialogTitle>
            {isCurrentUser && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Tab Navigation */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("mutual")}
              className={`px-4 py-2 font-medium ${
                activeTab === "mutual"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mutual
            </button>
            {isCurrentUser && (
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "edit"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Edit
              </button>
            )}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <UserAvatar src={profile.imageUrl} className="h-20 w-20" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    {profile.nickname && (
                      <Badge variant="secondary">@{profile.nickname}</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      {getStatusIcon(profile.status || "ONLINE")}
                      <span className={`text-sm ${getStatusColor(profile.status || "ONLINE")}`}>
                        {profile.status?.toLowerCase().replace("_", " ") || "online"}
                      </span>
                    </div>
                  </div>
                  
                  {profile.bio && (
                    <p className="text-sm text-gray-600">{profile.bio}</p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                    {profile.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(profile.userId, "User ID")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy User ID
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(profile.name, "Username")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Username
                  </Button>
                  {isCurrentUser && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Switch Account
                    </Button>
                  )}
                </div>
              </div>

              {profile.socialMedia && Object.keys(profile.socialMedia).length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Social Media</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(profile.socialMedia).map(([platform, url]) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(url as string, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mutual Tab */}
          {activeTab === "mutual" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Mutual Servers ({mutualServers.length})
                </h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {mutualServers.map((server) => (
                    <div
                      key={server.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <UserAvatar src={server.imageUrl} className="h-8 w-8" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{server.name}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {server.memberCount} members
                        </p>
                      </div>
                    </div>
                  ))}
                  {mutualServers.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No mutual servers
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Mutual Friends ({mutualFriends.length})
                </h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {mutualFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <UserAvatar src={friend.imageUrl} className="h-8 w-8" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{friend.name}</span>
                          {getStatusIcon(friend.status)}
                        </div>
                        <p className={`text-xs ${getStatusColor(friend.status)}`}>
                          {friend.status.toLowerCase().replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  ))}
                  {mutualFriends.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No mutual friends
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Edit Tab */}
          {isCurrentUser && activeTab === "edit" && (
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter display name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Me</FormLabel>
                        <FormControl>
                          <Input placeholder="Tell us about yourself" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://your-website.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ONLINE">Online</SelectItem>
                            <SelectItem value="IDLE">Idle</SelectItem>
                            <SelectItem value="DO_NOT_DISTURB">Do Not Disturb</SelectItem>
                            <SelectItem value="INVISIBLE">Invisible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
