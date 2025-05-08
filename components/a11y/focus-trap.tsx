"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  autoFocus?: boolean
  returnFocusOnDeactivate?: boolean
  onEscape?: () => void
}

export function FocusTrap({
  children,
  active = true,
  autoFocus = true,
  returnFocusOnDeactivate = true,
  onEscape,
}: FocusTrapProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])
  const previousActiveElement = useRef<Element | null>(null)

  // Store the previously focused element
  useEffect(() => {
    if (active && returnFocusOnDeactivate) {
      previousActiveElement.current = document.activeElement
    }
  }, [active, returnFocusOnDeactivate])

  // Return focus when trap is deactivated
  useEffect(() => {
    if (!active && returnFocusOnDeactivate && previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus()
    }
  }, [active, returnFocusOnDeactivate])

  // Find all focusable elements
  useEffect(() => {
    if (!active) return

    const root = rootRef.current
    if (!root) return

    const elements = Array.from(
      root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
    ) as HTMLElement[]

    setFocusableElements(elements)

    // Auto-focus the first element
    if (autoFocus && elements.length > 0) {
      elements[0].focus()
    }
  }, [active, autoFocus, children])

  // Handle tab key to trap focus
  useEffect(() => {
    if (!active || focusableElements.length === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        onEscape()
        return
      }

      if (e.key !== "Tab") return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

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
  }, [active, focusableElements, onEscape])

  return <div ref={rootRef}>{children}</div>
}
