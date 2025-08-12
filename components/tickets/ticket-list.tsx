"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Ticket, Clock, MessageSquare, User, AlertCircle, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TicketListProps {
  serverId: string;
  filters: {
    status?: string;
    priority?: string;
    category?: string;
  };
  isModerator: boolean;
}

interface TicketData {
  id: string;
  ticketNumber: string;
  title: string;
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
    createdAt: string;
    senderProfile: {
      id: string;
      name: string;
      imageUrl: string;
    };
  }>;
  _count: {
    messages: number;
  };
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

export const TicketList = ({ serverId, filters, isModerator }: TicketListProps) => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTickets();
  }, [serverId, filters]);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.category) params.append("category", filters.category);

      const response = await fetch(`/api/servers/${serverId}/tickets?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        setError("Failed to load tickets");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return MinusCircle;
    return config.icon;
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button onClick={fetchTickets} className="mt-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No tickets found</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {Object.keys(filters).length > 0 ? "Try adjusting your filters" : "Create your first ticket to get started"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {tickets.map((ticket) => {
        const StatusIcon = getStatusIcon(ticket.status);
        const ticketStatusConfig = statusConfig[ticket.status as keyof typeof statusConfig];
        const ticketPriorityConfig = priorityConfig[ticket.priority as keyof typeof priorityConfig];
        const ticketCategoryConfig = categoryConfig[ticket.category as keyof typeof categoryConfig];

        return (
          <div
            key={ticket.id}
            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => router.push(`/servers/${serverId}/tickets/${ticket.id}`)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <StatusIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {ticket.ticketNumber} - {ticket.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {ticket.requesterProfile.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <span>{ticket._count.messages}</span>
                <Clock className="h-4 w-4" />
                <span>{formatDate(ticket.lastActivity)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <Badge className={ticketStatusConfig?.color || "bg-gray-100 text-gray-800"}>
                {ticketStatusConfig?.label || ticket.status}
              </Badge>
              <Badge className={ticketPriorityConfig?.color || "bg-gray-100 text-gray-800"}>
                {ticketPriorityConfig?.label || ticket.priority}
              </Badge>
              <Badge className={ticketCategoryConfig?.color || "bg-gray-100 text-gray-800"}>
                {ticketCategoryConfig?.label || ticket.category}
              </Badge>
            </div>

            {ticket.assignedProfile && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Assigned to:</span>
                <div className="flex items-center space-x-1">
                  <img
                    src={ticket.assignedProfile.imageUrl}
                    alt={ticket.assignedProfile.name}
                    className="h-4 w-4 rounded-full"
                  />
                  <span>{ticket.assignedProfile.name}</span>
                </div>
              </div>
            )}

            {ticket.messages.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {ticket.messages[0].content}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
