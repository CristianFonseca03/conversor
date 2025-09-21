/**
 * Currency selector component
 */

import type { CurrencySelectorProps } from "../types";
import { REAL_CURRENCIES } from "../utils/currencyUtils";
import { useRealCurrencies } from "../hooks";

export const CurrencySelector = ({
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
}: CurrencySelectorProps) => {
  const { getAllRealCurrencies, isLoading, error } = useRealCurrencies();

  // Use configuration if available, otherwise fallback to legacy constants
  const currencies =
    isLoading || error ? REAL_CURRENCIES : getAllRealCurrencies();
  const currencyEntries = Array.isArray(currencies)
    ? currencies.map((currency) => [currency.code, currency] as const)
    : Object.entries(currencies);

  return (
    <select
      id="currency-select"
      value={selectedCurrency}
      onChange={(e) =>
        onCurrencyChange(e.target.value as keyof typeof REAL_CURRENCIES)
      }
      disabled={disabled || isLoading}
      className={`
        w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-base text-gray-700 font-medium
        transition-all duration-200 cursor-pointer
        hover:border-gray-400 hover:enabled:border-gray-400
        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
        disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
      `}
    >
      {currencyEntries.map(([code, info]) => (
        <option key={code} value={code}>
          {info.name} ({code})
        </option>
      ))}
    </select>
  );
};
