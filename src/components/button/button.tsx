import React from 'react';
import './button.css';
import t from 'i18n';

export interface ButtonProps {
  children: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  loading,
  type = 'button',
  onClick = () => {},
}) => {
  return (
    <button
      className="Button"
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? t('loading') : children}
    </button>
  );
};

export default Button;
