"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, X, Clock, CheckSquare } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(1, "Question is required").max(500, "Question must be less than 500 characters"),
  options: z.array(z.string().min(1, "Option text is required").max(100, "Option must be less than 100 characters")).min(2, "At least 2 options are required").max(10, "Maximum 10 options allowed"),
  expiresAt: z.string().optional(),
  allowMultipleVotes: z.boolean().default(false),
});

export const CreatePollModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "createPoll";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: ["", ""],
      expiresAt: "",
      allowMultipleVotes: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Filter out empty options
      const validOptions = values.options.filter(option => option.trim() !== "");
      
      if (validOptions.length < 2) {
        form.setError("options", { message: "At least 2 options are required" });
        return;
      }

      const pollData = {
        question: values.question,
        options: validOptions,
        expiresAt: values.expiresAt ? new Date(values.expiresAt).toISOString() : null,
        allowMultipleVotes: values.allowMultipleVotes,
        apiUrl: data.apiUrl,
        query: data.query,
      };

      await axios.post("/api/polls", pollData, {
        withCredentials: true,
      });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error creating poll:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const addOption = () => {
    const currentOptions = form.getValues("options");
    if (currentOptions.length < 10) {
      form.setValue("options", [...currentOptions, ""]);
    }
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options");
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== index);
      form.setValue("options", newOptions);
    }
  };

  const currentOptions = form.watch("options");

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-md">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create a Poll
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Ask a question and let people vote on the options
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="px-6 space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-zinc-500 dark:text-secondary/70">
                      Question
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-zinc-50/50 dark:bg-zinc-800/50 border-0 focus-visible:ring-0 text-black dark:text-zinc-200 focus-visible:ring-offset-0"
                        placeholder="What would you like to ask?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel className="text-xs font-semibold text-zinc-500 dark:text-secondary/70">
                  Options
                </FormLabel>
                {currentOptions.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`options.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              disabled={isLoading}
                              className="bg-zinc-50/50 dark:bg-zinc-800/50 border-0 focus-visible:ring-0 text-black dark:text-zinc-200 focus-visible:ring-offset-0"
                              placeholder={`Option ${index + 1}`}
                              {...field}
                            />
                            {currentOptions.length > 2 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(index)}
                                disabled={isLoading}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                {currentOptions.length < 10 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-zinc-500 dark:text-secondary/70 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Expiration (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          disabled={isLoading}
                          className="bg-zinc-50/50 dark:bg-zinc-800/50 border-0 focus-visible:ring-0 text-black dark:text-zinc-200 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowMultipleVotes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs font-semibold text-zinc-500 dark:text-secondary/70 flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          Allow multiple votes
                        </FormLabel>
                        <p className="text-xs text-zinc-500">
                          Users can vote for multiple options
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <Button
                  disabled={isLoading}
                  onClick={handleClose}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Create Poll
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
