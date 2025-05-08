"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"

interface ResponsiveImageViewerProps {
  src: string
  alt: string
  title?: string
  aspectRatio?: "square" | "video" | "wide" | "auto"
}

export function ResponsiveImageViewer({ src, alt, title, aspectRatio = "auto" }: ResponsiveImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    auto: "",
  }[aspectRatio]

  return (
    <>
      <div
        className={`relative border rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
          aspectRatio !== "auto" ? aspectRatioClass : "h-48 sm:h-64"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={isMobile ? "w-[95vw] p-4" : "max-w-4xl p-6"}>
          {title && (
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
          )}
          <div className="relative aspect-[4/3] sm:h-[60vh] w-full">
            <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-contain" sizes="95vw" priority />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
