"use client"

import { cn } from "@/lib/utils"
import Image, { type ImageProps } from "next/image"
import { useState } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string
  aspectRatio?: "square" | "video" | "portrait" | "auto"
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback = "/ancient-scroll.png",
  aspectRatio = "auto",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio]

  return (
    <div className={cn("relative overflow-hidden", aspectRatio !== "auto" && aspectRatioClass, className)}>
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse" />}
      <Image
        src={error ? fallback : src}
        alt={alt}
        className={cn("object-cover transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        {...props}
      />
    </div>
  )
}
