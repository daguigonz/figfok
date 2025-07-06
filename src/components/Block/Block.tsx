import React from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Block.module.css";
import type { BlockProps } from "./Block.type";

// Config Block CVA - https://cva.style/docs/config
export const blockVariants = cva(styles.base, {
  variants: {
    variant: {
      block: styles.block,
      grid: styles.grid,
    },
    col: {
      col_100: styles.col_100,
      col_70_20: styles.col_70_20,
    },
  },
  defaultVariants: {
    variant: "block",
    col: "col_100",
  },
});

// <Block>
export const Block = ({
  className,
  variant,
  col,
  children,
  ...props
}: BlockProps) => {
  return (
    <div
      className={clsx(blockVariants({ variant, col }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Col = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

Block.displayName = "Block";
Block.Col = Col;

export default Block;
