"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

interface TicketFiltersProps {
  serverId: string;
  currentFilters: {
    status?: string;
    priority?: string;
    category?: string;
  };
  isModerator: boolean;
}

const statusOptions = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "WAITING_FOR_USER", label: "Waiting for User" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

const categoryOptions = [
  { value: "GENERAL", label: "General" },
  { value: "TECHNICAL", label: "Technical" },
  { value: "BILLING", label: "Billing" },
  { value: "FEATURE_REQUEST", label: "Feature Request" },
  { value: "BUG_REPORT", label: "Bug Report" },
  { value: "OTHER", label: "Other" },
];

export const TicketFilters = ({ serverId, currentFilters, isModerator }: TicketFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const updateFilters = (newFilters: typeof currentFilters) => {
    const params = new URLSearchParams(searchParams);
    
    // Clear existing filter params
    params.delete("status");
    params.delete("priority");
    params.delete("category");
    
    // Add new filter params
    if (newFilters.status) params.set("status", newFilters.status);
    if (newFilters.priority) params.set("priority", newFilters.priority);
    if (newFilters.category) params.set("category", newFilters.category);
    
    router.push(`/servers/${serverId}/tickets?${params.toString()}`);
  };

  const clearFilters = () => {
    setLocalFilters({});
    updateFilters({});
  };

  const hasActiveFilters = Object.values(currentFilters).some(Boolean);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {Object.values(currentFilters).filter(Boolean).length} active
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Status
          </label>
          <Select
            value={localFilters.status || undefined}
            onValueChange={(value) => {
              const newFilters = { ...localFilters, status: value };
              setLocalFilters(newFilters);
              updateFilters(newFilters);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Priority
          </label>
          <Select
            value={localFilters.priority || undefined}
            onValueChange={(value) => {
              const newFilters = { ...localFilters, priority: value };
              setLocalFilters(newFilters);
              updateFilters(newFilters);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Category
          </label>
          <Select
            value={localFilters.category || undefined}
            onValueChange={(value) => {
              const newFilters = { ...localFilters, category: value };
              setLocalFilters(newFilters);
              updateFilters(newFilters);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {currentFilters.status && (
            <Badge variant="outline" className="text-xs">
              Status: {statusOptions.find(opt => opt.value === currentFilters.status)?.label}
              <button
                onClick={() => {
                  const newFilters = { ...currentFilters, status: undefined };
                  updateFilters(newFilters);
                }}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentFilters.priority && (
            <Badge variant="outline" className="text-xs">
              Priority: {priorityOptions.find(opt => opt.value === currentFilters.priority)?.label}
              <button
                onClick={() => {
                  const newFilters = { ...currentFilters, priority: undefined };
                  updateFilters(newFilters);
                }}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentFilters.category && (
            <Badge variant="outline" className="text-xs">
              Category: {categoryOptions.find(opt => opt.value === currentFilters.category)?.label}
              <button
                onClick={() => {
                  const newFilters = { ...currentFilters, category: undefined };
                  updateFilters(newFilters);
                }}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
