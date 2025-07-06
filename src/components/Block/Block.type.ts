import type React from "react"

// type Variants
export type BlockVariants = "block" | "grid" | "nowrap"

export type Col = "col_100" | "col_70_20"

// interface´s
export interface BlockVariantProps {
  variant?: BlockVariants
  col?: Col
}

export interface BlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BlockVariantProps {}
