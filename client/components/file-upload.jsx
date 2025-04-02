"use client";

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Plus } from "lucide-react"
import { cn, getVideoDuration } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileList } from "./file-list"
import { PhotoGallery } from "./photo-gallery"
import { toast } from "@/hooks/use-toast";

export function FileUpload({
  accept,
  maxSize,
  maxDuration,
  multiple = false,
  minFiles = 0,
  maxFiles,
  value = [],
  onChange,
  onRemove,
  disabled = false,
  title,
  description,
  helperText
}) {
  const [files, setFiles] = React.useState(value)
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState({})

  const onDrop = React.useCallback(async (acceptedFiles) => {
    if (disabled) return

    try {
      setIsUploading(true)
      const validFiles = []

      for (const file of acceptedFiles) {
        // Check file size
        if (maxSize && file.size > maxSize) {
          toast({
            title: "Error",
            description: `File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`,
            variant: "destructive",
          })
          continue
        }

        // Check video duration
        if (maxDuration && file.type.startsWith("video/")) {
          const duration = await getVideoDuration(file)
          if (duration > maxDuration) {
            toast({
              title: "Error",
              description: `Video ${file.name} is too long. Maximum duration is ${maxDuration} seconds.`,
              variant: "destructive",
            })
            continue
          }
        }

        validFiles.push(file)
      }

      // Check number of files
      const totalFiles = files.length + validFiles.length
      if (maxFiles && totalFiles > maxFiles) {
        toast({
          title: "Error",
          description: `Maximum ${maxFiles} files allowed.`,
          variant: "destructive",
        })
        return
      }

      // Simulate upload progress
      const newProgress = {}
      validFiles.forEach((file) => {
        newProgress[file.name] = 0
      })
      setUploadProgress(newProgress)

      // Simulate file upload
      for (const file of validFiles) {
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }))
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }

      const newFiles = [...files, ...validFiles]
      setFiles(newFiles)
      onChange?.(newFiles)

      toast({
        title: "Success",
        description: "Files uploaded successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An error occurred while uploading files.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress({})
    }
  }, [disabled, files, maxDuration, maxFiles, maxSize, onChange])

  const handleRemove = React.useCallback((file) => {
    const newFiles = files.filter((f) => f !== file)
    setFiles(newFiles)
    onChange?.(newFiles)
    onRemove?.(file)
  }, [files, onChange, onRemove])

  const handleView = (file) => {
    window.open(URL.createObjectURL(file), "_blank")
  }

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    disabled: disabled || isUploading,
  })

  return (
    (<Card className="border-gray-200 ">
      <CardHeader className="border-b border-gray-200 px-5 pb-2.5 pt-5">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <div
          {...getRootProps()}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center",
            isDragActive ? "border-primary bg-primary/5" : "border-gray-200",
            disabled && "pointer-events-none opacity-60"
          )}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-lg border border-gray-200 p-2.5">
              <Plus className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-base">Drag & drop or choose files</div>
            <div className="text-sm text-gray-500">{helperText}</div>
          </div>
        </div>

        {files[0]?.type.includes("video") ? (
          <FileList
            files={files}
            progress={uploadProgress}
            onRemove={handleRemove}
            onView={handleView}
            onDownload={handleDownload} />
        ) : (
          <PhotoGallery files={files} onRemove={handleRemove} />
        )}

        {files.length < minFiles && (
          <div className="text-sm text-destructive">
            Please upload at least {minFiles} {minFiles === 1 ? "file" : "files"}.
          </div>
        )}
      </CardContent>
    </Card>)
  );
}

