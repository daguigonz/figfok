import { useState, useEffect } from "react"
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
  values
}: ColorPaletteProps) => {
  return (
    <div className={clsx(colorPaletteVariants({ variant }), className)}>
      {Object.entries(values).map(([key, value]) => (
        <div key={key} className={styles.item}>
          <div className={styles.key}>{key}</div>
          <div className={styles.value}>{value}</div>
          <div
            className={styles.swatch}
            style={{ backgroundColor: value }}
          ></div>
        </div>
      ))}
    </div>
  )
}

export default ColorPalette
