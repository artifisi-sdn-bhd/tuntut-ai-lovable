"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  autoFocus?: boolean
}

export function FocusTrap({ children, active = true, autoFocus = true }: FocusTrapProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    const root = rootRef.current
    if (!root) return

    // Find all focusable elements
    const focusableElements = root.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Auto-focus the first element
    if (autoFocus && firstElement) {
      firstElement.focus()
    }

    // Handle tab key to trap focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [active, autoFocus])

  return <div ref={rootRef}>{children}</div>
}
