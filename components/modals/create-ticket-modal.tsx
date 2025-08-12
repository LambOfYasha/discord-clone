"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const CreateTicketModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const serverId = data.serverId;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    category: "GENERAL",
  });

  const isModalOpen = isOpen && type === "createTicket";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverId) return;
    
    setIsLoading(true);

    try {
      const response = await fetch(`/api/servers/${serverId}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const ticket = await response.json();
        toast.success("Ticket created successfully!");
        onClose();
        // Reset form
        setFormData({
          title: "",
          description: "",
          priority: "MEDIUM",
          category: "GENERAL",
        });
      } else {
        const error = await response.text();
        toast.error(error || "Failed to create ticket");
      }
    } catch (error) {
      console.error("Create ticket error:", error);
      toast.error("Failed to create ticket");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!serverId) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Support Ticket
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Submit a new support request
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 px-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Brief description of your issue..."
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                disabled={isLoading}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your issue..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={isLoading}
                className="mt-2"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority" className="text-sm font-semibold">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleChange("priority", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-semibold">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL">General</SelectItem>
                    <SelectItem value="TECHNICAL">Technical</SelectItem>
                    <SelectItem value="BILLING">Billing</SelectItem>
                    <SelectItem value="FEATURE_REQUEST">Feature Request</SelectItem>
                    <SelectItem value="BUG_REPORT">Bug Report</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31] px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.title || !formData.description}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Ticket"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
