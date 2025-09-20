/**
 * Amount input component
 */

import type { AmountInputProps } from "../types";

export const AmountInput = ({
  amount,
  onAmountChange,
  disabled = false,
  placeholder = "Enter amount...",
}: AmountInputProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="amount-input"
        className="block text-sm font-medium text-gray-700"
      >
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
        className={`
          w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          placeholder:text-gray-400
          text-lg font-medium
          transition-colors duration-200
        `}
        aria-describedby="amount-input-help"
        autoComplete="off"
      />
      <small id="amount-input-help" className="block text-xs text-gray-500">
        Enter a positive number to convert
      </small>
    </div>
  );
};
