import { cn } from "@/lib/utils"
import type React from "react"

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fullBleed?: boolean
}

export function MobileCard({ fullBleed = true, className, children, ...props }: MobileCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground",
        fullBleed
          ? "rounded-none border-x-0 sm:rounded-lg sm:border w-full -mx-4 sm:mx-0 lg:shadow-md"
          : "rounded-lg border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MobileCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8", className)} {...props} />
}

export function MobileCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4", className)} {...props} />
}

export function MobileCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-2", className)} {...props} />
}
