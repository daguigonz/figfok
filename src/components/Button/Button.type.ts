import type React from "react"

// We define the types of variants directly
export type ButtonVariant =
  | "primary"
  | "active"
  | "secondary"
  | "outline"
  | "danger"
  | "text"
  | "link"
export type ButtonSize = "small" | "medium" | "large"

// Type for the button ref
export type ButtonRef = React.ElementRef<"button">

// Base interface for variants
interface ButtonVariantProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

// Advanced typing combining native props with our variants
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  isLoading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
