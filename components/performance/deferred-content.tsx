"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface DeferredContentProps {
  children: React.ReactNode
  delay?: number
  fallback?: React.ReactNode
}

export function DeferredContent({ children, delay = 200, fallback = null }: DeferredContentProps) {
  const [isClient, setIsClient] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const timer = setTimeout(() => {
      setShouldRender(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  // Server-side or first render
  if (!isClient) return fallback

  // After delay
  return shouldRender ? children : fallback
}
