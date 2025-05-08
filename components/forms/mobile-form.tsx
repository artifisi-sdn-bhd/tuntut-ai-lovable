import { cn } from "@/lib/utils"
import type * as React from "react"

interface MobileFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  spacing?: "tight" | "normal" | "loose"
}

export function MobileForm({ className, spacing = "normal", ...props }: MobileFormProps) {
  const spacingClasses = {
    tight: "space-y-3",
    normal: "space-y-6",
    loose: "space-y-8",
  }

  return <form className={cn(spacingClasses[spacing], className)} {...props} />
}

interface MobileFormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  spacing?: "tight" | "normal" | "loose"
}

export function MobileFormSection({
  title,
  description,
  className,
  spacing = "normal",
  children,
  ...props
}: MobileFormSectionProps) {
  const spacingClasses = {
    tight: "space-y-2",
    normal: "space-y-4",
    loose: "space-y-6",
  }

  return (
    <div className={cn(spacingClasses[spacing], className)} {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={spacingClasses[spacing]}>{children}</div>
    </div>
  )
}

interface MobileFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  error?: string
  required?: boolean
  optional?: boolean
}

export function MobileFormField({
  label,
  htmlFor,
  error,
  required,
  optional,
  className,
  children,
  ...props
}: MobileFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
          {optional && <span className="text-muted-foreground ml-1 text-xs">(optional)</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

interface MobileFormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean
  direction?: "row" | "column"
  alignment?: "start" | "center" | "end" | "between" | "around"
}

export function MobileFormActions({
  fullWidth = false,
  direction = "row",
  alignment = "end",
  className,
  children,
  ...props
}: MobileFormActionsProps) {
  const alignmentClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        direction === "column" ? "flex-col" : "flex-row",
        fullWidth && "w-full",
        alignmentClasses[alignment],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
