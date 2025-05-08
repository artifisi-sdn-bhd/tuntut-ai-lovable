import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"

interface MobileOptimizedCardProps extends CardProps {
  fullWidthOnMobile?: boolean
}

export function MobileOptimizedCard({
  fullWidthOnMobile = true,
  className,
  children,
  ...props
}: MobileOptimizedCardProps) {
  return (
    <Card
      className={cn(
        fullWidthOnMobile && "-mx-4 sm:mx-0 rounded-none sm:rounded-lg shadow-none sm:shadow",
        "border-x-0 sm:border-x border-t-0 sm:border-t",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
