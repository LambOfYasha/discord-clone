"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, Calendar, User, MessageSquare, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EmbedWithCreator } from "@/types";
import { format } from "date-fns";

interface EmbedsListProps {
  embeds: EmbedWithCreator[];
  serverId: string;
}

export const EmbedsList = ({ embeds, serverId }: EmbedsListProps) => {
  const router = useRouter();

  if (embeds.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-zinc-500 dark:text-zinc-400">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No embeds yet</h3>
            <p className="text-sm mb-4">
              Create your first embed to get started with rich messaging.
            </p>
            <Button onClick={() => router.push(`/servers/${serverId}/embeds/create`)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Embed
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {embeds.map((embed) => (
        <Card key={embed.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">
                  {embed.title || "Untitled Embed"}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{embed.creatorProfile.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(embed.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {embed.color && (
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: embed.color }}
                  />
                )}
                <Badge variant="secondary">
                  {embed.fields.length} field{embed.fields.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {embed.description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">
                {embed.description}
              </p>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/servers/${serverId}/embeds/${embed.id}`)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/servers/${serverId}/embeds/${embed.id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
