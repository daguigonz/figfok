import type React from "react"

// Definimos los tipos de variantes directamente
export type ButtonVariant =
  | "primary"
  | "active"
  | "secondary"
  | "outline"
  | "danger"
  | "text"
  | "link"
export type ButtonSize = "small" | "medium" | "large"

// Tipo para el ref del botón
export type ButtonRef = React.ElementRef<"button">

// Interface base para las variantes
interface ButtonVariantProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

// Tipado avanzado combinando props nativas con nuestras variantes
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  isLoading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
