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
    if (!ref.current?.previousElementSibling) {
      ref.current?.focus();
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        if (ref.current?.previousElementSibling) {
          (ref.current.previousElementSibling as HTMLDivElement).focus();
        }
        break;
      case 'ArrowDown':
        if (ref.current?.nextElementSibling && value !== AnswerResult.NO) {
          (ref.current.nextElementSibling as HTMLDivElement).focus();
        }
        break;
      case '1':
        onChange(id, AnswerResult.YES);
        break;
      case '2':
        onChange(id, AnswerResult.NO);
        break;
      default:
        break;
    }
  };

  const onClick = (value: AnswerResult) => {
    onChange(id, value);
  };

  return (
    <div
      className={`switch ${disabled ? 'switch-disabled' : 'switch-enabled'}`}
      tabIndex={0}
      ref={ref}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <p className="switch__description">{description}</p>
      <div className="switch__control">
        <button
          disabled={disabled}
          className={`switch__control__btn ${
            value === AnswerResult.YES ? 'active' : ''
          }`}
          onClick={() => onClick(AnswerResult.YES)}
        >
          {t('yes')}
        </button>
        <button
          disabled={disabled}
          className={`switch__control__btn ${
            value === AnswerResult.NO ? 'active' : ''
          }`}
          onClick={() => onClick(AnswerResult.NO)}
        >
          {t('no')}
        </button>
      </div>
    </div>
  );
};

export default SwitchInput;
