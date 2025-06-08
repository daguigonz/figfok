import type React from "react";

// type Variants
export type BlockVariants = "block" | "grid";
export type Row = 1 | 2 | 3 | 4 | 5 | 6;

// interface´s
export interface BlockVariantProps {
  variant?: BlockVariants;
  row?: Row;
}

export interface BlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
  BlockVariantProps {
}
