import { cn } from "@/lib/utils"
import type * as React from "react"
import { forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  error?: boolean
  fullWidth?: boolean
}

const MobileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition = "left", error, fullWidth = true, ...props }, ref) => {
    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
            fullWidth && "w-full",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
        )}
      </div>
    )
  },
)
MobileInput.displayName = "MobileInput"

export { MobileInput }
