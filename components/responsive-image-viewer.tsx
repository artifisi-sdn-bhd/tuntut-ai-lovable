"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"

type AspectRatioType = "square" | "video" | "wide" | "portrait" | "auto"

interface ResponsiveImageViewerProps {
  src: string
  alt: string
  title?: string
  aspectRatio?: AspectRatioType
  className?: string
  priority?: boolean
  quality?: number
  onClick?: () => void
}

const aspectRatioClasses: Record<AspectRatioType, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  auto: "",
}

export function ResponsiveImageViewer({
  src,
  alt,
  title,
  aspectRatio = "auto",
  className,
  priority = false,
  quality = 80,
  onClick,
}: ResponsiveImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    onClick?.()
  }, [onClick])

  return (
    <>
      <div
        className={`relative border rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
          aspectRatio !== "auto" ? aspectRatioClasses[aspectRatio] : "h-48 sm:h-64"
        } ${className}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label={`View ${alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleOpen()
          }
        }}
      >
        <Image
          src={src || "/placeholder.svg?height=400&width=600&query=placeholder+image"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          quality={quality}
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
            <Image
              src={src || "/placeholder.svg?height=800&width=1200&query=placeholder+image"}
              alt={alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
              quality={quality}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
