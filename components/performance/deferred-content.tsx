"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface DeferredContentProps {
  children: React.ReactNode
  delay?: number
  fallback?: React.ReactNode
  priority?: "low" | "medium" | "high"
}

export function DeferredContent({ children, delay = 200, fallback = null, priority = "medium" }: DeferredContentProps) {
  const [isClient, setIsClient] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Adjust delay based on priority
  const actualDelay = priority === "high" ? 0 : priority === "medium" ? delay : delay * 2

  useEffect(() => {
    setIsClient(true)

    // Use requestIdleCallback for low priority content if available
    if (priority === "low" && typeof window.requestIdleCallback === "function") {
      const idleCallbackId = window.requestIdleCallback(
        () => setShouldRender(true),
        { timeout: 1000 }, // Fallback timeout
      )
      return () => window.cancelIdleCallback(idleCallbackId)
    }

    // Otherwise use setTimeout
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, actualDelay)

    return () => clearTimeout(timer)
  }, [actualDelay, priority])

  // Server-side or first render
  if (!isClient) return fallback

  // After delay
  return shouldRender ? children : fallback
}
