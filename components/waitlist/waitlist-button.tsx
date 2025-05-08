"use client"

import { Button } from "@/components/ui/button"
import { GOOGLE_FORM_URL } from "@/lib/constants"
import { ExternalLink } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaitlistButtonProps extends ButtonProps {}

export function WaitlistButton({ className, size, ...props }: WaitlistButtonProps) {
  const handleClick = () => {
    window.open(GOOGLE_FORM_URL, "_blank")
  }

  return (
    <Button onClick={handleClick} className={cn("", className)} size={size || "default"} {...props}>
      Join Waitlist <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  )
}
