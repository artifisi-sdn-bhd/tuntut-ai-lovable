"use client"

import { cn } from "@/lib/utils"
import Image, { type ImageProps } from "next/image"
import { useState, useEffect } from "react"

type AspectRatioType = "square" | "video" | "portrait" | "wide" | "auto"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string
  aspectRatio?: AspectRatioType
  showPlaceholder?: boolean
  placeholderColor?: string
}

const aspectRatioClasses: Record<AspectRatioType, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  auto: "",
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback = "/abstract-colorful-swirls.png",
  aspectRatio = "auto",
  showPlaceholder = true,
  placeholderColor = "bg-muted",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Reset loading and error states when src changes
  useEffect(() => {
    setIsLoading(true)
    setError(false)
    setImageSrc(src)
  }, [src])

  return (
    <div
      className={cn("relative overflow-hidden", aspectRatio !== "auto" && aspectRatioClasses[aspectRatio], className)}
    >
      {isLoading && showPlaceholder && (
        <div className={cn("absolute inset-0 flex items-center justify-center animate-pulse", placeholderColor)} />
      )}
      <Image
        src={error ? fallback : imageSrc}
        alt={alt}
        className={cn("object-cover transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
          console.error(`Failed to load image: ${src}`)
        }}
        {...props}
      />
    </div>
  )
}
