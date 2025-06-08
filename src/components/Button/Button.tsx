import React from "react";
import { forwardRef, useCallback } from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Button.module.css";
import type { ButtonProps, ButtonRef } from "./Button.type";

// Config Buttons CVA - https://cva.style/docs/config
export const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      danger: styles.danger,
      ghost: styles.ghost,
      link: styles.link,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// <Button>
export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      children,
      disabled,
      startIcon,
      endIcon,
      onClick,
      ...props
    },
    ref,
  ) => {
    // click
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading || disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      },
      [onClick, isLoading, disabled],
    );

    const isDisabled = isLoading || disabled;

    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        onClick={handleClick}
        aria-disabled={isDisabled}
        data-loading={isLoading ? "true" : undefined}
        {...props}
      >
        {isLoading && <span className={styles.loader} aria-hidden="true" />}

        {!isLoading && startIcon && (
          <span className={styles.startIcon}>{startIcon}</span>
        )}

        {children && <span className={styles.content}>{children}</span>}

        {!isLoading && endIcon && (
          <span className={styles.endIcon}>{endIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
