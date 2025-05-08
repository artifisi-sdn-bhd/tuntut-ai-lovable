"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  role: "claimant", // or "adjuster"
}

export function Header() {
  const [user, setUser] = useState<typeof mockUser | null>(null)
  const pathname = usePathname()

  // Simulate fetching user data
  useEffect(() => {
    setUser(mockUser)
  }, [])

  if (!user) return null

  const isAdjuster = user.role === "adjuster"

  const navItems = isAdjuster
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/claims", label: "All Claims" },
        { href: "/how-it-works", label: "How It Works" },
      ]
    : [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/new-claim", label: "New Claim" },
        { href: "/my-claims", label: "My Claims" },
        { href: "/how-it-works", label: "How It Works" },
      ]

  return null
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
