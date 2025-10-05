import type React from "react"
import type { FigmaCollection } from "@/interfaces/figma.interface"

// Color Pallete component variant
export type ColorPaletteVariant = "base"

// Base variant interface
interface ColorPaletteVariantProps {
  variant?: ColorPaletteVariant
}

// Advanced props native with our variants
export interface ColorPaletteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "">,
    ColorPaletteVariantProps {
  dataFigma?: FigmaCollection[]
  visible?: boolean
}
