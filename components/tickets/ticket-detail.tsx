"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ArrowLeft, Send, Clock, User, AlertCircle, CheckCircle, XCircle, MinusCircle } from "lucide-react";

interface TicketDetailProps {
  ticket: {
    id: string;
    ticketNumber: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    lastActivity: string;
    requesterProfile: {
      id: string;
      name: string;
      imageUrl: string;
    };
    assignedProfile?: {
      id: string;
      name: string;
      imageUrl: string;
    };
    messages: Array<{
      id: string;
      content: string;
      fileUrl?: string;
      isInternal: boolean;
      createdAt: string;
      senderProfile: {
        id: string;
        name: string;
        imageUrl: string;
      };
    }>;
  };
  serverId: string;
  isModerator: boolean;
}

const statusConfig = {
  OPEN: { label: "Open", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", icon: AlertCircle },
  IN_PROGRESS: { label: "In Progress", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", icon: Clock },
  WAITING_FOR_USER: { label: "Waiting for User", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300", icon: User },
  RESOLVED: { label: "Resolved", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", icon: CheckCircle },
  CLOSED: { label: "Closed", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300", icon: XCircle },
};

const priorityConfig = {
  LOW: { label: "Low", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
  MEDIUM: { label: "Medium", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  HIGH: { label: "High", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  URGENT: { label: "Urgent", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
};

const categoryConfig = {
  GENERAL: { label: "General", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
  TECHNICAL: { label: "Technical", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  BILLING: { label: "Billing", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  FEATURE_REQUEST: { label: "Feature Request", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  BUG_REPORT: { label: "Bug Report", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  OTHER: { label: "Other", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
};

export const TicketDetail = ({ ticket, serverId, isModerator }: TicketDetailProps) => {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [category, setCategory] = useState(ticket.category);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`/api/servers/${serverId}/tickets/${ticket.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          isInternal,
        }),
      });

      if (response.ok) {
        setNewMessage("");
        setIsInternal(false);
        toast.success("Message sent successfully!");
        // Refresh the page to show new message
        router.refresh();
      } else {
        const error = await response.text();
        toast.error(error || "Failed to send message");
      }
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleUpdateTicket = async (field: string, value: string) => {
    try {
      const response = await fetch(`/api/servers/${serverId}/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: value,
        }),
      });

      if (response.ok) {
        toast.success("Ticket updated successfully!");
        router.refresh();
      } else {
        const error = await response.text();
        toast.error(error || "Failed to update ticket");
      }
    } catch (error) {
      console.error("Update ticket error:", error);
      toast.error("Failed to update ticket");
    }
  };

  const isClosed = ticket.status === "CLOSED" || ticket.status === "RESOLVED";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/servers/${serverId}/tickets`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {ticket.ticketNumber} - {ticket.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Created by {ticket.requesterProfile.name} on {formatDate(ticket.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            {isModerator ? (
              <Select value={status} onValueChange={(value) => {
                setStatus(value);
                handleUpdateTicket("status", value);
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge className={`mt-1 ${statusConfig[ticket.status as keyof typeof statusConfig]?.color || "bg-gray-100 text-gray-800"}`}>
                {statusConfig[ticket.status as keyof typeof statusConfig]?.label || ticket.status}
              </Badge>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            {isModerator ? (
              <Select value={priority} onValueChange={(value) => {
                setPriority(value);
                handleUpdateTicket("priority", value);
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge className={`mt-1 ${priorityConfig[ticket.priority as keyof typeof priorityConfig]?.color || "bg-gray-100 text-gray-800"}`}>
                {priorityConfig[ticket.priority as keyof typeof priorityConfig]?.label || ticket.priority}
              </Badge>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            {isModerator ? (
              <Select value={category} onValueChange={(value) => {
                setCategory(value);
                handleUpdateTicket("category", value);
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge className={`mt-1 ${categoryConfig[ticket.category as keyof typeof categoryConfig]?.color || "bg-gray-100 text-gray-800"}`}>
                {categoryConfig[ticket.category as keyof typeof categoryConfig]?.label || ticket.category}
              </Badge>
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300">{ticket.description}</p>
        </div>

        {ticket.assignedProfile && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to:</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ticket.assignedProfile.imageUrl} />
                <AvatarFallback>{ticket.assignedProfile.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{ticket.assignedProfile.name}</span>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-3 ${message.isInternal ? "opacity-75" : ""}`}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={message.senderProfile.imageUrl} />
              <AvatarFallback>{message.senderProfile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {message.senderProfile.name}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(message.createdAt)}
                </span>
                {message.isInternal && (
                  <Badge variant="outline" className="text-xs">
                    Internal
                  </Badge>
                )}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      {!isClosed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            {isModerator && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isInternal"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="isInternal" className="text-sm text-gray-600 dark:text-gray-400">
                  Send as internal note (only visible to staff)
                </label>
              </div>
            )}
            <div className="flex space-x-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                rows={3}
                disabled={sending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                className="self-end"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

