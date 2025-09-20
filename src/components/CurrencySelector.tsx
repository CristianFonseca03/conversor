/**
 * Currency selector component
 */

import type { CurrencySelectorProps } from "../types";
import { REAL_CURRENCIES } from "../utils/currencyUtils";

export const CurrencySelector = ({
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
}: CurrencySelectorProps) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <label
        htmlFor="currency-select"
        className="font-semibold text-gray-600 text-sm leading-5"
      >
        Select Currency:
      </label>
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={(e) =>
          onCurrencyChange(e.target.value as keyof typeof REAL_CURRENCIES)
        }
        disabled={disabled}
        className={`
          px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-base leading-6 text-gray-600
          transition-all duration-200 cursor-pointer
          hover:border-gray-400 hover:enabled:border-gray-400
          focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
        `}
        aria-describedby="currency-selector-help"
      >
        {Object.entries(REAL_CURRENCIES).map(([code, info]) => (
          <option key={code} value={code}>
            {info.name} ({code})
          </option>
        ))}
      </select>
      <small
        id="currency-selector-help"
        className="text-gray-500 text-xs leading-4"
      >
        Choose the currency you want to convert from
      </small>
    </div>
  );
};
