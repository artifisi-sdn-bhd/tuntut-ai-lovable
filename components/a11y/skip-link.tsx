"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SkipLinkProps {
  targetId?: string
  label?: string
  className?: string
}

export function SkipLink({ targetId = "main-content", label = "Skip to main content", className }: SkipLinkProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
    >
      {label}
    </a>
  )
}
