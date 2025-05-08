"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Camera, File, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface MobileDocumentUploadProps {
  accept?: string
  maxSize?: number // in MB
  maxFiles?: number
  onFilesChange?: (files: File[]) => void
  className?: string
  showPreview?: boolean
  allowCamera?: boolean
}

export function MobileDocumentUpload({
  accept = "image/*,application/pdf",
  maxSize = 10, // 10MB
  maxFiles = 5,
  onFilesChange,
  className,
  showPreview = true,
  allowCamera = true,
}: MobileDocumentUploadProps) {
  const [files, setFiles] = useState<Array<{ file: File; preview: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload a maximum of ${maxFiles} files.`,
        variant: "destructive",
      })
      return
    }

    const validFiles = selectedFiles.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum size of ${maxSize}MB.`,
          variant: "destructive",
        })
        return false
      }

      // Check file type
      const fileType = file.type.split("/")[0]
      const acceptedTypes = accept.split(",").map((type) => type.trim())

      const isAccepted = acceptedTypes.some((type) => {
        if (type === "*/*") return true
        if (type === `${fileType}/*`) return true
        return file.type === type
      })

      if (!isAccepted) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an accepted file type.`,
          variant: "destructive",
        })
        return false
      }

      return true
    })

    const newFiles = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)

    if (onFilesChange) {
      onFilesChange(updatedFiles.map((f) => f.file))
    }

    // Reset the input
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    URL.revokeObjectURL(newFiles[index].preview)
    newFiles.splice(index, 1)
    setFiles(newFiles)

    if (onFilesChange) {
      onFilesChange(newFiles.map((f) => f.file))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={triggerFileInput} className="h-12">
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>

        {allowCamera && (
          <Button type="button" variant="outline" onClick={triggerCameraInput} className="h-12">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileChange}
          className="hidden"
        />

        {allowCamera && (
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        )}
      </div>

      {files.length > 0 && showPreview && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((file, index) => (
            <div key={index} className="relative border rounded-lg overflow-hidden">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full z-10"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>

              {file.file.type.startsWith("image/") ? (
                <div className="relative aspect-square">
                  <Image src={file.preview || "/placeholder.svg"} alt={file.file.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex items-center justify-center p-4 aspect-square bg-muted">
                  <File className="h-10 w-10 text-muted-foreground" />
                  <span className="text-xs mt-2 text-center line-clamp-2">{file.file.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload up to {maxFiles} files (max {maxSize}MB each)
      </p>
    </div>
  )
}
