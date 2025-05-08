"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useSwipe } from "@/hooks/use-swipe"
import { useRef } from "react"
import { useScrollLock } from "@/hooks/use-scroll-lock"

interface GalleryImage {
  src: string
  alt: string
  thumbnail?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  className?: string
  aspectRatio?: "square" | "video" | "auto"
  columns?: 2 | 3 | 4
  gap?: "small" | "medium" | "large"
}

export function ImageGallery({
  images,
  className,
  aspectRatio = "square",
  columns = 3,
  gap = "medium",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Lock scroll when lightbox is open
  useScrollLock(selectedIndex !== null)

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  }[aspectRatio]

  const gapClass = {
    small: "gap-1",
    medium: "gap-2",
    large: "gap-4",
  }[gap]

  const columnsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  }[columns]

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [selectedIndex, images.length])

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [selectedIndex, images.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, goToPrevious, goToNext, closeLightbox])

  // Handle swipe gestures
  useSwipe(galleryRef, {
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
  })

  if (images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className={cn(`grid ${columnsClass} ${gapClass}`, className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className={cn("relative rounded-lg overflow-hidden cursor-pointer border", aspectRatioClass)}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            aria-label={`View ${image.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                openLightbox(index)
              }
            }}
          >
            <img
              src={image.thumbnail || image.src || "/placeholder.svg?height=400&width=400&query=image"}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent
          ref={galleryRef}
          className="max-w-[95vw] p-0 sm:p-0 h-[90vh] flex items-center justify-center bg-black/90"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next</span>
          </Button>

          {selectedIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[selectedIndex].src || "/placeholder.svg?height=800&width=800&query=image"}
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
