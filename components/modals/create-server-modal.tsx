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
import CustomPopup from "@/components/custom-popup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Loader2, Server } from "lucide-react";
import { ServerCategory } from "@/prisma/generated/postgres";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }).max(100, {
    message: "Server name must be less than 100 characters",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
  category: z.nativeEnum(ServerCategory, {
    message: "Please select a category",
  }),
});

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const isModalOpen = isOpen && type === "createServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      category: ServerCategory.POPULAR,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const hasErrors = error || uploadError;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      setUploadError(null);
      
      // Check if there are any upload errors before submitting
      if (uploadError) {
        setError("Please fix the upload error before creating the server.");
        return;
      }

      await axios.post("/api/servers", values);
      form.reset();
      onClose();
      router.refresh();
      setTimeout(() => {
        setIsPopupOpen(true);
      }, 500);
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    form.reset();
    setError(null);
    setUploadError(null);
    onClose();
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error in modal:", error);
    setUploadError(error.message || "Upload failed. Please try again.");
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-md mx-auto">
          <DialogHeader className="pt-8 px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Server className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center font-bold mb-2">
              Create a server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500 text-sm leading-relaxed">
              Give your server a unique name and upload an image to make it stand out. 
              You can always customize these later!
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="px-6 space-y-6">
                {/* Server Image Upload */}
                <div className="flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <FileUpload
                            endpoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                            onUploadError={handleUploadError}
                          />
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Server Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-0 bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 text-black focus-visible:ring-offset-0 transition-all duration-200"
                          placeholder="Enter a server name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-zinc-400">
                        This is how your server will appear to others
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Server Category Selection */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Category
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-0 bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 text-black focus-visible:ring-offset-0 transition-all duration-200">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ServerCategory.POPULAR}>🔥 Popular</SelectItem>
                          <SelectItem value={ServerCategory.CHRISTIANITY}>✝️ Christianity</SelectItem>
                          <SelectItem value={ServerCategory.BUSINESS}>💼 Business</SelectItem>
                          <SelectItem value={ServerCategory.SOCIAL}>👥 Social</SelectItem>
                          <SelectItem value={ServerCategory.SCIENCE_AND_EDUCATION}>🔬 Science & Education</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs text-zinc-400">
                        Choose a category to help others discover your server
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error Messages */}
                {hasErrors && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {uploadError && <p className="text-red-600 text-sm">{uploadError}</p>}
                  </div>
                )}
              </div>

              <DialogFooter className="bg-gray-50 px-6 py-4">
                <div className="flex gap-3 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    variant="primary" 
                    disabled={isLoading || !!uploadError}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Server"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <CustomPopup
        isOpen={isPopupOpen}
        message="Server created successfully!"
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};
