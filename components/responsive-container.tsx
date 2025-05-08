import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const maxWidthMap = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
}

export function ResponsiveContainer({
  as: Component = "div",
  maxWidth = "lg",
  className,
  children,
  ...props
}: ResponsiveContainerProps) {
  return (
    <Component className={cn("w-full px-4 md:px-6 py-2 md:py-4 mx-auto", maxWidthMap[maxWidth], className)} {...props}>
      {children}
    </Component>
  )
}
