import React from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.type";

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={() => console.log("button clicked")}
    >
      {label}
    </button>
  );
};

export default Button;
