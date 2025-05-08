"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { GOOGLE_FORM_URL } from "@/lib/constants"

interface WaitlistRedirectButtonProps extends ButtonProps {
  openInNewTab?: boolean
}

export function WaitlistRedirectButton({
  children = "Join Waitlist",
  openInNewTab = false,
  ...props
}: WaitlistRedirectButtonProps) {
  const handleClick = () => {
    if (openInNewTab) {
      window.open(GOOGLE_FORM_URL, "_blank")
    } else {
      window.location.href = GOOGLE_FORM_URL
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
