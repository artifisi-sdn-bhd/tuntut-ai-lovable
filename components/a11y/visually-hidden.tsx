import { cn } from "@/lib/utils"
import type * as React from "react"

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  as?: React.ElementType
}

export function VisuallyHidden({ children, className, as: Component = "span", ...props }: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        "absolute h-px w-px p-0 overflow-hidden whitespace-nowrap border-0",
        "clip-[rect(0px,0px,0px,0px)]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
