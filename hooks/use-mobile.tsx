"use client"

import { useState, useEffect } from "react"

type BreakpointSize = "sm" | "md" | "lg" | "xl" | "2xl" | number

const breakpointSizes: Record<Exclude<BreakpointSize, number>, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

/**
 * Hook to detect if the current viewport is mobile based on a breakpoint
 * @param breakpoint - The breakpoint to check against (can be a number or a predefined size)
 * @returns boolean indicating if the viewport is smaller than the breakpoint
 */
export function useIsMobile(breakpoint: BreakpointSize = "md"): boolean {
  const [isMobile, setIsMobile] = useState(false)

  // Convert string breakpoint to number if needed
  const breakpointValue = typeof breakpoint === "number" ? breakpoint : breakpointSizes[breakpoint]

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window === "undefined") return

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpointValue)
    }

    // Initial check
    checkIfMobile()

    // Add event listener with debounce for performance
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkIfMobile, 100)
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpointValue])

  return isMobile
}
