/**
 * Exchange rates display component
 */

import type { ExchangeRatesDisplayProps } from "../types";
import { formatRealCurrency } from "../utils/currencyUtils";
import { LoadingSpinner } from "./LoadingSpinner";

export const ExchangeRatesDisplay = ({
  rates,
  isLoading,
}: ExchangeRatesDisplayProps) => {
  if (isLoading) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-md flex items-center justify-center min-h-[120px] text-center">
        <LoadingSpinner size="small" text="Loading rates..." />
      </div>
    );
  }

  if (!rates) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-md flex items-center justify-center min-h-[120px] text-center">
        <p className="text-red-600 italic m-0">Unable to load exchange rates</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-md">
      <h3 className="m-0 mb-2 text-lg font-bold text-gray-800 text-center">
        Current Exchange Rates
      </h3>
      <p className="m-0 mb-6 text-xs text-gray-500 text-center">
        Updated: {new Date(rates.lastUpdated).toLocaleDateString()}
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-lg border-l-4 border-primary-500 sm:flex-col sm:items-start sm:gap-1">
          <span className="font-semibold text-gray-600 text-sm">1 USD =</span>
          <span className="font-bold text-gray-800 text-base">
            {formatRealCurrency(rates.COP, "COP")}
          </span>
        </div>

        <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-lg border-l-4 border-primary-500 sm:flex-col sm:items-start sm:gap-1">
          <span className="font-semibold text-gray-600 text-sm">1 USD =</span>
          <span className="font-bold text-gray-800 text-base">
            {formatRealCurrency(rates.MXN, "MXN")}
          </span>
        </div>
      </div>
    </div>
  );
};
