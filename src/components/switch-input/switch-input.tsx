import React, { useRef, useEffect, KeyboardEvent } from 'react';
import t from 'i18n';
import './switch-input.css';
import { AnswerResult } from 'models/Answer';

export interface SwitchInputProps {
  id: string;
  description: string;
  value?: AnswerResult;
  disabled?: boolean;
  onChange: (id: string, value: AnswerResult) => void;
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  id,
  description,
  value,
  disabled,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus on the first check automatically
    if (!ref.current?.previousElementSibling) {
      ref.current?.focus();
    }
  }, []);

  // In order to prevent disabled,etc logics, switch input has its own handleChange
  const handleChange = (id: string, value: AnswerResult) => {
    if (disabled) return;
    onChange(id, value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        if (ref.current?.previousElementSibling) {
          (ref.current.previousElementSibling as HTMLDivElement).focus();
        }
        break;
      case 'ArrowDown':
        if (ref.current?.nextElementSibling && value === AnswerResult.YES) {
          (ref.current.nextElementSibling as HTMLDivElement).focus();
        }
        break;
      case '1':
        handleChange(id, AnswerResult.YES);
        break;
      case '2':
        handleChange(id, AnswerResult.NO);
        break;
      default:
        break;
    }
  };

  const handleClick = (value: AnswerResult) => {
    handleChange(id, value);
  };

  return (
    <div
      className={`switch ${disabled ? 'switch-disabled' : 'switch-enabled'}`}
      tabIndex={0}
      ref={ref}
      onKeyDown={handleKeyDown}
    >
      <p className="switch__description">{description}</p>
      <div className="switch__control">
        <button
          disabled={disabled}
          className={`switch__control__btn ${
            value === AnswerResult.YES ? 'active' : ''
          }`}
          onClick={() => handleClick(AnswerResult.YES)}
        >
          {t('yes')}
        </button>
        <button
          disabled={disabled}
          className={`switch__control__btn ${
            value === AnswerResult.NO ? 'active' : ''
          }`}
          onClick={() => handleClick(AnswerResult.NO)}
        >
          {t('no')}
        </button>
      </div>
    </div>
  );
};

export default SwitchInput;
