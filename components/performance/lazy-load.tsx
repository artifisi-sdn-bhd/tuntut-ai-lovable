"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface LazyLoadProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  placeholder?: React.ReactNode
}

export function LazyLoad({ children, threshold = 0.1, rootMargin = "200px 0px", placeholder }: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder || <div className="h-40 bg-muted animate-pulse rounded-md" />}
    </div>
  )
}
