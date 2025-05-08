import { cn } from "@/lib/utils"
import type React from "react"

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full"
type PaddingSize = "none" | "small" | "medium" | "large"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: ContainerSize
  padding?: PaddingSize
  centered?: boolean
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
}

const paddingMap: Record<PaddingSize, string> = {
  none: "",
  small: "px-2 sm:px-3 md:px-4",
  medium: "px-4 sm:px-6 md:px-8",
  large: "px-6 sm:px-8 md:px-10 lg:px-12",
}

export function Container({
  as: Component = "div",
  size = "lg",
  padding = "medium",
  centered = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("w-full", sizeMap[size], paddingMap[padding], centered && "mx-auto", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
