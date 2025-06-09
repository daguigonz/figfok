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
    row: {
      1: styles.row1,
      2: styles.row2,
      3: styles.row3,
    },
  },
  defaultVariants: {
    variant: "block",
    row: 1,
  },
});

// <Block>
export const Block = ({
  className,
  variant,
  row,
  children,
  ...props
}: BlockProps) => {
  return (
    <div
      className={clsx(blockVariants({ variant, row }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Col = ({ children, ...props }: { children: React.ReactNode }) => {
  return <div {...props}>{children}</div>;
};

Block.displayName = "Block";
Block.Col = Col;

export default Block;
