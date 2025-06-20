import type React from "react";

// Definimos los tipos de variantes directamente
export type LoadingVariant = "circle" | "bar";
export type LoadingVisible = "visible" | "hidden";

// Interface base para las variantes
interface LoadingVariantProps {
  variant?: LoadingVariant;
  visible?: LoadingVisible;
}

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    LoadingVariantProps {}
