import { cn } from "@/lib/utils"
import type * as React from "react"

interface MobileFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function MobileForm({ className, ...props }: MobileFormProps) {
  return <form className={cn("space-y-6", className)} {...props} />
}

interface MobileFormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

export function MobileFormSection({ title, description, className, children, ...props }: MobileFormSectionProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

interface MobileFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  error?: string
}

export function MobileFormField({ label, htmlFor, error, className, children, ...props }: MobileFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

interface MobileFormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean
}

export function MobileFormActions({ fullWidth = false, className, children, ...props }: MobileFormActionsProps) {
  return (
    <div
      className={cn("flex items-center gap-4", fullWidth ? "flex-col w-full" : "flex-row justify-end", className)}
      {...props}
    >
      {children}
    </div>
  )
}
