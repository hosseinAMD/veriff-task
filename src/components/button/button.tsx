import React from "react";
import "./button.css";

export interface ButtonProps {
  children: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button
      className="Button"
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
