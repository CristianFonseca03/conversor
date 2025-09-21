/**
 * Exchange rates display component
 */

import type { ExchangeRatesDisplayProps } from "../types";
import { useFictionalCurrencies, useRealCurrencies } from "../hooks";
import { LoadingSpinner } from "./LoadingSpinner";

export const ExchangeRatesDisplay = ({
  rates,
  isLoading,
}: ExchangeRatesDisplayProps) => {
  const { getAllFictionalCurrencies } = useFictionalCurrencies();
  const { getAllRealCurrencies } = useRealCurrencies();
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-80">
        <div className="flex items-center justify-center min-h-[300px]">
          <LoadingSpinner size="small" text="Cargando tasas..." />
        </div>
      </div>
    );
  }

  if (!rates) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-80">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-red-600 italic m-0">
            No se pudieron cargar las tasas
          </p>
        </div>
      </div>
    );
  }

  // Get fictional currencies from configuration
  const fictionalCurrencies = getAllFictionalCurrencies();
  const realCurrencies = getAllRealCurrencies();
  
  // Build currency display data dynamically
  const currencies = [
    // Fictional currencies from configuration
    ...fictionalCurrencies.map(currency => ({
      emoji: currency.icon,
      name: currency.name,
      description: "Moneda Ficticia",
      rate: `1 ${currency.name} = $${currency.usdValue} USD`,
      flag: null,
      color: currency.color,
    })),
    // Real currencies from configuration
    ...realCurrencies
      .filter(currency => !currency.isBase) // Exclude base currency
      .map(currency => ({
        emoji: null,
        name: currency.code,
        description: currency.name,
        rate: `${rates ? Math.round(Number(rates[currency.code as keyof typeof rates]) || 0) : 0} ${currency.code} = $1 USD`,
        flag: currency.flag,
        color: currency.color,
      })),
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 w-80 min-w-0">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 text-xl">💱</span>
        <h2 className="text-lg font-bold text-gray-800 m-0">Tasas de Cambio</h2>
      </div>

      <div className="space-y-2">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${currency.color} transition-all hover:shadow-md`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-2xl flex-shrink-0">
                {currency.emoji || currency.flag}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-gray-800 text-base">
                  {currency.name}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {currency.description}
                </div>
              </div>
            </div>
            <div className="text-xs font-bold text-gray-700 flex-shrink-0 ml-2 whitespace-nowrap">
              {currency.rate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
