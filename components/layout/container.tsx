import { cn } from "@/lib/utils"
import type React from "react"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizeMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
}

export function Container({ as: Component = "div", size = "lg", className, children, ...props }: ContainerProps) {
  return (
    <Component className={cn("w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10", sizeMap[size], className)} {...props}>
      {children}
    </Component>
  )
}
