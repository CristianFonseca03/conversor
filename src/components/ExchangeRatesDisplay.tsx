/**
 * Exchange rates display component
 */

import type { ExchangeRatesDisplayProps } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";

export const ExchangeRatesDisplay = ({
  rates,
  isLoading,
}: ExchangeRatesDisplayProps) => {
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

  const currencies = [
    {
      emoji: "🪿",
      name: "Gansito",
      description: "Moneda Ficticia",
      rate: "1 Gansito = $1 USD",
      flag: null,
      color: "border-yellow-400 bg-yellow-50",
    },
    {
      emoji: "🤡",
      name: "Balatro",
      description: "Moneda Ficticia",
      rate: "0.1 Balatro = $1 USD",
      flag: null,
      color: "border-red-400 bg-red-50",
    },
    {
      emoji: "🕷️",
      name: "Silksong",
      description: "Moneda Ficticia",
      rate: "0.05 Silksong = $1 USD",
      flag: null,
      color: "border-gray-400 bg-gray-50",
    },
    {
      emoji: null,
      name: "MXN",
      description: "Peso Mexicano",
      rate: `20 MXN = $1 USD`,
      flag: "🇲🇽",
      color: "border-green-400 bg-green-50",
    },
    {
      emoji: null,
      name: "COP",
      description: "Peso Colombiano",
      rate: `4000 COP = $1 USD`,
      flag: "🇨🇴",
      color: "border-blue-400 bg-blue-50",
    },
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
