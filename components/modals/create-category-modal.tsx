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
import qs from "query-string";
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
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Loader2, Folder } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category name is required",
    })
    .max(100, {
      message: "Category name must be less than 100 characters",
    }),
});

export const CreateCategoryModal = () => {
  const { isOpen, onClose, type } = useModal();
  const params = useParams();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isModalOpen = isOpen && type === "createCategory";
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      const url = qs.stringifyUrl({
        url: "/api/categories",
        query: {
          serverId: params?.serverId,
        },
      });
      await axios.post(url, values);
      form.reset();
      onClose();
      router.refresh();
      setTimeout(() => {
        setIsPopupOpen(true);
      }, 500);
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    form.reset();
    setError(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-md mx-auto">
          <DialogHeader className="pt-8 px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Folder className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center font-bold mb-2">
              Create category
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500 text-sm leading-relaxed">
              Create a category to organize your server channels.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="px-6 space-y-6">
                {/* Category Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Category name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-0 bg-zinc-100 focus-visible:ring-2 focus-visible:ring-green-500 text-black focus-visible:ring-offset-0 transition-all duration-200"
                          placeholder="Enter a category name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-zinc-400">
                        This is how your category will appear to others
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                  <Button
                    disabled={isLoading}
                    onClick={handleClose}
                    variant="ghost"
                    className="text-zinc-500 hover:text-zinc-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Create Category"
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
        onClose={() => setIsPopupOpen(false)}
        title="Success!"
        message="Category created successfully."
        type="success"
      />
    </>
  );
};
