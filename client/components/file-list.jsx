"use client";
import { FileVideo, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatFileSize } from "@/lib/utils"

export function FileList({
  files,
  progress,
  onRemove,
  onView,
  onDownload
}) {
  if (!files.length) return null

  return (
    (<div className="space-y-4">
      <div className="text-base font-medium">Uploaded {files[0].type.includes("video") ? "Video" : "Photos"}</div>
      {files.map((file, index) => {
        const isUploading = progress?.[file.name] !== undefined && progress[file.name] < 100

        if (file.type.includes("video")) {
          return (
            (<div
              key={index}
              className="flex items-center gap-5 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex flex-1 items-center gap-5">
                <FileVideo className="h-8 w-8" />
                <div className="flex-1 space-y-1">
                  <div className="text-base font-medium">{file.name}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    {isUploading && <span>{progress[file.name]}%</span>}
                  </div>
                  {isUploading && (
                    <Progress
                      value={progress[file.name]}
                      className="h-1"
                      indicatorClassName="bg-[#7B00FF]" />
                  )}
                </div>
              </div>
              {!isUploading && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-[34px] w-[34px] rounded-full bg-gray-100"
                    onClick={() => onView?.(file)}>
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-[34px] w-[34px] rounded-full bg-gray-100"
                    onClick={() => onDownload?.(file)}>
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-[34px] w-[34px] rounded-full bg-gray-100"
                    onClick={() => onRemove(file)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              )}
            </div>)
          );
        }

        return null
      })}
    </div>)
  );
}

