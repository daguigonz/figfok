import React from "react";
import styles from "./Loading.module.css";
import type { LoadingProps } from "./Loading.type";

export const Loading = ({
  variant = "circle",
  visible = "visible",
  ...props
}: LoadingProps) => {
  return (
    <div
      className={styles.base}
      style={{ visibility: visible === "visible" ? "visible" : "hidden" }}
      {...props}
    >
      {variant === "circle" && <div className={styles.circle} />}

      {variant === "bar" && <div className={styles.barInner} />}
    </div>
  );
};

const Title = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <div className={styles.title} {...props}>
      {children}
    </div>
  );
};

const Text = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <div className={styles.text} {...props}>
      {children}
    </div>
  );
};

Loading.displayName = "Loading";
Loading.Title = Title;
Loading.Text = Text;
export default Loading;
