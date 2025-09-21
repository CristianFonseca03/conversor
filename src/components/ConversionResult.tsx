/**
 * Conversion result display component
 */

import type { ConversionResultProps } from "../types";
import {
  formatFictionalCurrency,
  formatFictionalCurrencyWithConfig,
  formatRealCurrency,
} from "../utils/currencyUtils";
import { useFictionalCurrencies, useRealCurrencies } from "../hooks";
import { LoadingSpinner } from "./LoadingSpinner";

export const ConversionResult = ({
  result,
  isLoading,
}: ConversionResultProps) => {
  const { getAllFictionalCurrencies, isLoading: configLoading } = useFictionalCurrencies();
  const { getBaseCurrency } = useRealCurrencies();
  
  if (isLoading) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-lg flex items-center justify-center min-h-[200px] text-center">
        <LoadingSpinner size="medium" text="Converting..." />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-lg flex items-center justify-center min-h-[200px] text-center">
        <p className="text-gray-400 italic m-0">
          Enter an amount to see the conversion result
        </p>
      </div>
    );
  }

  const { originalAmount, originalCurrency, usdEquivalent, fictionalCurrency } =
    result;

  // Get fictional currencies configuration for dynamic display
  const fictionalCurrencies = getAllFictionalCurrencies();
  const baseCurrency = getBaseCurrency();
  const baseCurrencyCode = baseCurrency?.code || "USD"; // fallback to USD if not found
  
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-lg">
      <h3 className="m-0 mb-6 text-xl font-bold text-gray-800 text-center border-b-2 border-gray-100 pb-3">
        Conversion Result
      </h3>

      <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
        <span className="font-semibold text-gray-600 text-sm">
          Original Amount:
        </span>
        <span className="font-bold text-gray-800 text-base">
          {formatRealCurrency(originalAmount, originalCurrency)}
        </span>
      </div>

      {originalCurrency !== baseCurrencyCode && (
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
          <span className="font-semibold text-gray-600 text-sm">
            {baseCurrency?.name || "Base Currency"} Equivalent:
          </span>
          <span className="font-bold text-gray-800 text-base">
            {formatRealCurrency(usdEquivalent, baseCurrencyCode as "USD" | "COP" | "MXN")}
          </span>
        </div>
      )}

      <div className="flex flex-col items-start gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <span className="font-semibold text-gray-600 text-sm">
          Fictional Currency:
        </span>
        <div className="text-lg leading-7 text-gray-800 font-semibold text-center w-full sm:text-left">
          {/* Use configuration-based formatting if available, otherwise fallback */}
          {!configLoading && fictionalCurrencies.length > 0 
            ? formatFictionalCurrencyWithConfig(fictionalCurrency, { 
                fictionalCurrencies: fictionalCurrencies.reduce((acc, curr) => {
                  acc[curr.code] = curr;
                  return acc;
                }, {} as Record<string, typeof fictionalCurrencies[0]>),
                realCurrencies: {},
                conversionRules: {},
                metadata: { version: '', lastUpdated: '', description: '' }
              })
            : formatFictionalCurrency(fictionalCurrency)
          }
        </div>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-gray-100">
        <h4 className="m-0 mb-4 text-base font-semibold text-gray-600">
          Breakdown:
        </h4>
        <ul className="list-none m-0 p-0 flex flex-col gap-2">
          {fictionalCurrency.silksongs > 0 && (
            <li className="flex items-center gap-3 p-2 px-3 bg-slate-50 rounded-md text-base text-gray-600 border-l-4 border-gray-200 hover:bg-slate-100 hover:border-primary-500 transition-colors">
              {fictionalCurrencies.find(c => c.code === 'silksong')?.icon || '🕷️'} {fictionalCurrency.silksongs} {
                fictionalCurrency.silksongs === 1 
                  ? (fictionalCurrencies.find(c => c.code === 'silksong')?.name || 'Silksong')
                  : (fictionalCurrencies.find(c => c.code === 'silksong')?.namePlural || 'Silksongs')
              }
            </li>
          )}
          {fictionalCurrency.balatros > 0 && (
            <li className="flex items-center gap-3 p-2 px-3 bg-slate-50 rounded-md text-base text-gray-600 border-l-4 border-gray-200 hover:bg-slate-100 hover:border-primary-500 transition-colors">
              {fictionalCurrencies.find(c => c.code === 'balatro')?.icon || '🤡'} {fictionalCurrency.balatros} {
                fictionalCurrency.balatros === 1 
                  ? (fictionalCurrencies.find(c => c.code === 'balatro')?.name || 'Balatro')
                  : (fictionalCurrencies.find(c => c.code === 'balatro')?.namePlural || 'Balatros')
              }
            </li>
          )}
          {fictionalCurrency.gansitos > 0 && (
            <li className="flex items-center gap-3 p-2 px-3 bg-slate-50 rounded-md text-base text-gray-600 border-l-4 border-gray-200 hover:bg-slate-100 hover:border-primary-500 transition-colors">
              {fictionalCurrencies.find(c => c.code === 'gansito')?.icon || '🪿'} {fictionalCurrency.gansitos} {
                fictionalCurrency.gansitos === 1 
                  ? (fictionalCurrencies.find(c => c.code === 'gansito')?.name || 'Gansito')
                  : (fictionalCurrencies.find(c => c.code === 'gansito')?.namePlural || 'Gansitos')
              }
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
