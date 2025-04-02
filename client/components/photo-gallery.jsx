"use client";
import Image from "next/image"
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PhotoGallery({
  files,
  onRemove
}) {
  if (!files.length) return null

  return (
    (<div className="space-y-4">
      <div className="text-base font-medium">Uploaded Photos</div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file, index) => (
          <div key={index} className="group relative space-y-2">
            <div
              className="relative aspect-[1.39] overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={file.name}
                fill
                className="object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-11 w-11 rounded-lg bg-black/30 opacity-0 group-hover:opacity-100"
                onClick={() => onRemove(file)}>
                <Trash2 className="h-6 w-6 text-white" />
              </Button>
            </div>
            <Select defaultValue="bedroom">
              <SelectTrigger className="w-[103px] border-0 p-0 text-lg font-normal shadow-none">
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bedroom">Bedroom</SelectItem>
                <SelectItem value="living">Living Room</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="bathroom">Bathroom</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>)
  );
}

