import type React from "react"
import { cn } from "@/lib/utils"

type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  maxWidth?: ContainerSize
  padding?: "none" | "small" | "medium" | "large"
  centered?: boolean
}

const maxWidthMap: Record<ContainerSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
}

const paddingMap = {
  none: "",
  small: "px-2 py-1 md:px-3 md:py-2",
  medium: "px-4 md:px-6 py-2 md:py-4",
  large: "px-6 md:px-8 py-4 md:py-6",
}

export function ResponsiveContainer({
  as: Component = "div",
  maxWidth = "lg",
  padding = "medium",
  centered = true,
  className,
  children,
  ...props
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn("w-full", maxWidthMap[maxWidth], paddingMap[padding], centered && "mx-auto", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
