import React from "react";
import PropTypes from "prop-types";

/**
 * A customizable button component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click event handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Button component
 */
const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  children,
  className = "",
  ...rest
}) => {
  const baseStyles = {
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

  const variantStyles = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "white",
      "&:hover": {
        backgroundColor: "#2563eb",
      },
    },
    secondary: {
      backgroundColor: "#6b7280",
      color: "white",
      "&:hover": {
        backgroundColor: "#4b5563",
      },
    },
    outline: {
      backgroundColor: "transparent",
      border: "1px solid #3b82f6",
      color: "#3b82f6",
      "&:hover": {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    },
  };

  const sizeStyles = {
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

  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      style={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
