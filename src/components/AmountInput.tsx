/**
 * Amount input component
 */

import type { AmountInputProps } from "../types";

export const AmountInput = ({
  amount,
  onAmountChange,
  disabled = false,
  placeholder = "600",
  error = null,
}: AmountInputProps) => {
  const hasError = error !== null;

  return (
    <div className="w-full">
      {hasError && (
        <div className="mb-2 text-sm text-red-600 font-medium">{error}</div>
      )}
      <input
        id="amount-input"
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 border-2 rounded-lg shadow-sm
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          placeholder:text-gray-400
          text-lg font-medium
          transition-colors duration-200
          ${
            hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300"
          }
        `}
        autoComplete="off"
      />
    </div>
  );
};
