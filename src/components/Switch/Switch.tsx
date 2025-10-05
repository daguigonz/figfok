import React from "react"
import { cva } from "class-variance-authority"
import { clsx } from "clsx"
import styles from "./Switch.module.css"
import type { SwitchProps } from "./Switch.type"

export const switchVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary
    }
  },
  defaultVariants: {
    variant: "primary"
  }
})

//<Switch>
export const Switch = ({
  className,
  variant,
  id,
  children,
  disabled,
  checked,
  onChange,
  ...props
}: SwitchProps) => {
  //const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e orig", e.target.checked)

    // checked = !e.target.checked
    onChange?.(e.target.checked)
  }

  return (
    <div className={clsx(switchVariants({ variant }), className)} {...props}>
      <input
        className={styles.input}
        type="checkbox"
        id={id}
        disabled={disabled}
        checked={checked}
        // onChange={e => handleOnChange(e)}
        onChange={e => onChange?.(e.target.checked)}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

Switch.displayName = "Switch"
export default Switch
