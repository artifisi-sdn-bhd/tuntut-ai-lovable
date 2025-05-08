"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface LazyLoadProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  placeholder?: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = "200px 0px",
  placeholder,
  fallback,
  className,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  // Error boundary functionality
  useEffect(() => {
    if (!isVisible) return

    const handleError = () => {
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [isVisible])

  return (
    <div ref={ref} className={className}>
      {isVisible
        ? hasError
          ? fallback || null
          : children
        : placeholder || <div className="h-40 bg-muted animate-pulse rounded-md" />}
    </div>
  )
}
