import type React from "react"

// We define the types of variants directly
export type LoadingVariant = "circle" | "bar"
export type LoadingVisible = "visible" | "hidden"

// Base interface for variants
interface LoadingVariantProps {
  variant?: LoadingVariant
  visible?: LoadingVisible
}

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    LoadingVariantProps {}
