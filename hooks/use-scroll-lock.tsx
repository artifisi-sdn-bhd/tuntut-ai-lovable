"use client"

import { useEffect } from "react"

export function useScrollLock(lock: boolean): void {
  useEffect(() => {
    if (typeof document === "undefined") return

    const originalStyle = window.getComputedStyle(document.body).overflow

    if (lock) {
      document.body.style.overflow = "hidden"

      // Add padding to prevent layout shift when scrollbar disappears
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = ""
    }
  }, [lock])
}
