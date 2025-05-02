import MuiButton from "@mui/material/Button";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   */
  size?: ButtonSize;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Function called when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * The content of the button
   */
  children?: ReactNode;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
}

/**
 * A customizable button component
 * @param props - Component props
 * @returns Button component
 */
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  children,
  className = "",
}) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease-in-out",
    border: "none",
    outline: "none",
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    secondary: {
      backgroundColor: "#6b7280",
      color: "white",
    },
    outline: {
      backgroundColor: "transparent",
      border: "1px solid #3b82f6",
      color: "#3b82f6",
    },
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    small: {
      padding: "6px 12px",
      fontSize: "14px",
    },
    medium: {
      padding: "8px 16px",
      fontSize: "16px",
    },
    large: {
      padding: "12px 24px",
      fontSize: "18px",
    },
  };

  const buttonStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <MuiButton
      style={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
