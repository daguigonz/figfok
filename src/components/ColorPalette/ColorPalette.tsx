import React from "react"
import { cva } from "class-variance-authority"
import { clsx } from "clsx"
import styles from "./ColorPalette.module.css"
import type { ColorPaletteProps } from "./ColorPalette.type"

export const colorPaletteVariants = cva(styles.base, {
  variants: {
    variant: {
      base: styles.base
    }
  },
  defaultVariants: {
    variant: "base"
  }
})

//<ColorPalette>
export const ColorPalette = ({
  className,
  variant,
  dataFigma
}: ColorPaletteProps) => {
  return (
    <div className={clsx(colorPaletteVariants({ variant }), className)}>
      {dataFigma && <pre>{JSON.stringify(dataFigma, null, 2)}</pre>}
    </div>
  )
}

export default ColorPalette
