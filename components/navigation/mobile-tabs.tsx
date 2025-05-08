"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

interface MobileTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const MobileTabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: "",
  onValueChange: () => {},
})

const MobileTabs = React.forwardRef<HTMLDivElement, MobileTabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [tabValue, setTabValue] = React.useState(value || defaultValue || "")

    // Update internal state when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setTabValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setTabValue(newValue)
        onValueChange?.(newValue)
      },
      [onValueChange],
    )

    return (
      <MobileTabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar", className)} {...props}>
          {children}
        </div>
      </MobileTabsContext.Provider>
    )
  },
)
MobileTabs.displayName = "MobileTabs"

const MobileTabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-12 sm:h-14 md:h-16 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full min-w-max",
          className,
        )}
        {...props}
      />
    )
  },
)
MobileTabsList.displayName = "MobileTabsList"

interface MobileTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  active?: boolean
}

const MobileTabsTrigger = React.forwardRef<HTMLButtonElement, MobileTabsTriggerProps>(
  ({ className, value, active, ...props }, ref) => {
    const { value: contextValue, onValueChange } = React.useContext(MobileTabsContext)
    const isActive = active !== undefined ? active : contextValue === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm sm:text-base md:text-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 sm:h-10 md:h-12 flex-1",
          isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          className,
        )}
        {...props}
      />
    )
  },
)
MobileTabsTrigger.displayName = "MobileTabsTrigger"

interface MobileTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const MobileTabsContent = React.forwardRef<HTMLDivElement, MobileTabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: contextValue } = React.useContext(MobileTabsContext)
    const isActive = contextValue === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "mt-4 sm:mt-6 md:mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
MobileTabsContent.displayName = "MobileTabsContent"

export { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent }
