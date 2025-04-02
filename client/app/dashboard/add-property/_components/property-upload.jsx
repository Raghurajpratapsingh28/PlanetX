"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FileUpload } from "@/components/file-upload";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  video: z
    .array(z.any())
    .min(1, "Please upload a property video")
    .max(1, "Only one video is allowed"),
  images: z
    .array(z.any())
    .min(5, "Please upload at least 5 images")
    .max(50, "Maximum 50 images allowed"),
});

export const PropertyUpload = ({
  files,
  setFiles,
  currentStep,
  setCurrentStep,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video: files?.video || [],
      images: files?.images || [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setFiles(data);
      toast({
        title: "Success",
        description: "Property media uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload property media.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (files?.video?.length && files?.images?.length >= 5) {
      setCurrentStep(currentStep + 1);
    }
  }, [files, currentStep, setCurrentStep]);

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Images & Video
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FileUpload
                title="Property Video"
                description="Add one property video for highlight"
                helperText="Max duration: 60s, Max size: 10MB (MP4, MOV, AVI)"
                accept={{
                  "video/*": [".mp4", ".mov", ".avi"],
                }}
                maxSize={10 * 1024 * 1024} // 10MB
                maxDuration={60}
                value={form.watch("video")}
                onChange={(files) => form.setValue("video", files)}
                maxFiles={1}
                className="w-full"
              />

              <FileUpload
                title="Property Images"
                description="Add at least 5 images"
                helperText="Max 50 photos, 5MB each (PNG, JPG, JPEG)"
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg"],
                }}
                maxSize={5 * 1024 * 1024} // 5MB
                multiple
                minFiles={5}
                maxFiles={50}
                value={form.watch("images")}
                onChange={(files) => form.setValue("images", files)}
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md text-sm sm:text-base transition-colors"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};