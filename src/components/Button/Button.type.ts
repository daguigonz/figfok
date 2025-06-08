import type React from "react";

// type Variants
export type ButtonVariants =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost"
  | "link";
export type size = "sm" | "md" | "lg";

// type href button
export type ButtonRef = React.ElementRef<"button">;

// interface´s
export interface ButtonVariantProps {
  variant?: ButtonVariants;
  size?: size;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  ButtonVariantProps {
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
