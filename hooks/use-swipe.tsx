"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  threshold?: number
  preventDefault?: boolean
}

export function useSwipe(ref: React.RefObject<HTMLElement>, handlers: SwipeHandlers, options: SwipeOptions = {}): void {
  const { threshold = 50, preventDefault = true } = options

  const startX = useRef(0)
  const startY = useRef(0)
  const [swiping, setSwiping] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
      startY.current = e.touches[0].clientY
      setSwiping(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!swiping) return

      if (preventDefault) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!swiping) return

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY

      const diffX = endX - startX.current
      const diffY = endY - startY.current

      const absX = Math.abs(diffX)
      const absY = Math.abs(diffY)

      // Check if it's a horizontal or vertical swipe
      if (absX > absY) {
        if (absX > threshold) {
          if (diffX > 0) {
            handlers.onSwipeRight?.()
          } else {
            handlers.onSwipeLeft?.()
          }
        }
      } else {
        if (absY > threshold) {
          if (diffY > 0) {
            handlers.onSwipeDown?.()
          } else {
            handlers.onSwipeUp?.()
          }
        }
      }

      setSwiping(false)
    }

    element.addEventListener("touchstart", handleTouchStart, { passive: false })
    element.addEventListener("touchmove", handleTouchMove, { passive: !preventDefault })
    element.addEventListener("touchend", handleTouchEnd)

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [ref, handlers, threshold, preventDefault, swiping])
}
