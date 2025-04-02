"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FileUpload } from "@/components/file-upload"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  video: z.array(z.custom()).min(1, "Please upload a property video"),
  photos: z.array(z.custom()).min(5, "Please upload at least 5 photos"),
})



export default function PropertyUpload() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video: [],
      photos: [],
    },
  })

  async function onSubmit(data) {
    try {
      // Here you would typically upload the files to your server
      console.log("Submitting:", data)

      toast({
        title: "Success",
        description: "Property media uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload property media.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FileUpload
            title="Property Video"
            description="Add One Property Video for Highlight"
            helperText="Max Duration of video 60 Seconds, Max size 10mb"
            accept={{
              "video/*": [".mp4", ".mov", ".avi"],
            }}
            maxSize={10 * 1024 * 1024} // 10MB
            maxDuration={60}
            value={form.watch("video")}
            onChange={(files) => form.setValue("video", files)}
            maxFiles={1}
          />

          <FileUpload
            title="Property Photos"
            description="Add at least 5 photos"
            helperText="Upload up to 50 photo of max size 5 mb in format png. jpg. jpeg."
            accept={{
              "image/*": [".png", ".jpg", ".jpeg"],
            }}
            maxSize={5 * 1024 * 1024} // 5MB
            multiple
            minFiles={5}
            maxFiles={50}
            value={form.watch("photos")}
            onChange={(files) => form.setValue("photos", files)}
          />

          <Button type="submit" className="w-full">
            Upload Media
          </Button>
        </form>
      </Form>
    </div>
  )
}

