import type React from "react"

// Variantes del componente Switch
export type SwitchVariant = "primary" | "secondary"

// Interfaz base de variantes
interface SwitchVariantProps {
  variant?: SwitchVariant
}

// Tipado avanzando props nativas con nuestras variantes
export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">,
    SwitchVariantProps {
  id: string
  disabled?: boolean
  checked?: boolean
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}
