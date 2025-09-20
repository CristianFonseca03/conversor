/**
 * Amount input component
 */

import type { AmountInputProps } from '../types';
import './AmountInput.module.css';

export const AmountInput = ({
  amount,
  onAmountChange,
  disabled = false,
  placeholder = "Enter amount...",
}: AmountInputProps) => {
  return (
    <div className="amount-input">
      <label htmlFor="amount-input" className="amount-input__label">
        Amount:
      </label>
      <input
        id="amount-input"
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="amount-input__field"
        aria-describedby="amount-input-help"
        autoComplete="off"
      />
      <small id="amount-input-help" className="amount-input__help">
        Enter a positive number to convert
      </small>
    </div>
  );
};
