import type React from "react"

// Switch component variants
export type SwitchVariant = "primary" | "secondary"

// Base variant interface
interface SwitchVariantProps {
  variant?: SwitchVariant
}

// Advanced typing of native props with our variants
export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">,
    SwitchVariantProps {
  id: string
  disabled?: boolean
  checked?: boolean
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}
