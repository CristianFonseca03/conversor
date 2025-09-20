/**
 * Main Currency Converter Application
 */

import {
  CurrencySelector,
  AmountInput,
  ExchangeRatesDisplay,
  ErrorDisplay,
  LoadingSpinner,
} from "./components";
import { useExchangeRates, useCurrencyConverter } from "./hooks";
import { useState } from "react";

function App() {
  const [inputError, setInputError] = useState<string | null>(null);

  const {
    exchangeRates,
    isLoading: ratesLoading,
    error: ratesError,
    refetch,
  } = useExchangeRates();

  const {
    selectedCurrency,
    amount,
    conversionResult,
    conversionError,
    setSelectedCurrency,
    setAmount,
    resetConverter,
  } = useCurrencyConverter({ exchangeRates });

  // Generar placeholder dinámico basado en la moneda seleccionada
  const getPlaceholderForCurrency = (currency: string): string => {
    switch (currency) {
      case "USD":
        return "1";
      case "COP":
        return "4000";
      case "MXN":
        return "20";
      default:
        return "1";
    }
  };

  const currentPlaceholder = getPlaceholderForCurrency(selectedCurrency);

  // Manejar cambio de monto con validación
  const handleAmountChange = (value: string) => {
    // Siempre actualizar el valor del input
    setAmount(value);

    // Limpiar error si el campo está vacío
    if (value === "") {
      setInputError(null);
      return;
    }

    // Verificar si contiene punto decimal o coma
    if (value.includes(".") || value.includes(",")) {
      setInputError("Solo se permiten montos enteros");
      return;
    }

    // Si es un número entero válido
    if (/^\d+$/.test(value)) {
      setInputError(null);
    } else {
      setInputError("Solo se permiten números enteros");
    }
  };

  // Manejar cambio de moneda y limpiar error
  const handleCurrencyChange = (currency: import("./types").RealCurrency) => {
    setInputError(null);
    setSelectedCurrency(currency);
  };

  const handleRetry = () => {
    refetch();
    resetConverter();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {(ratesError || conversionError) && (
        <div className="p-4">
          <ErrorDisplay
            error={ratesError || conversionError}
            onRetry={ratesError ? handleRetry : undefined}
          />
        </div>
      )}

      <main className="flex justify-center items-start gap-8 p-8 max-w-6xl mx-auto min-h-screen">
        {/* Panel izquierdo - Tasas de Cambio */}
        <aside className="flex-shrink-0">
          <ExchangeRatesDisplay
            rates={exchangeRates}
            isLoading={ratesLoading}
          />
        </aside>

        {/* Panel derecho - Conversor */}
        <div className="flex-1 max-w-lg">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Conversor de Monedas
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Moneda de Origen:
                </label>
                <CurrencySelector
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={handleCurrencyChange}
                  disabled={ratesLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Monto:
                </label>
                <AmountInput
                  amount={amount}
                  onAmountChange={handleAmountChange}
                  disabled={ratesLoading}
                  placeholder={currentPlaceholder}
                  error={inputError}
                />
              </div>

              {conversionResult && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Equivalencia Ficticia:
                  </h3>
                  <div className="space-y-3">
                    {conversionResult.fictionalCurrency.silksongs > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-2xl">🕷️</span>
                        <span className="text-gray-800 font-semibold">
                          {conversionResult.fictionalCurrency.silksongs}{" "}
                          Silksong
                          {conversionResult.fictionalCurrency.silksongs !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                    )}
                    {conversionResult.fictionalCurrency.balatros > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-2xl">🤡</span>
                        <span className="text-gray-800 font-semibold">
                          {conversionResult.fictionalCurrency.balatros} Balatro
                          {conversionResult.fictionalCurrency.balatros !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                    )}
                    {conversionResult.fictionalCurrency.gansitos > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-2xl">🪿</span>
                        <span className="text-gray-800 font-semibold">
                          {conversionResult.fictionalCurrency.gansitos} Gansito
                          {conversionResult.fictionalCurrency.gansitos !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {ratesLoading && !!amount && (
                <div className="flex justify-center py-6">
                  <LoadingSpinner size="small" text="Convirtiendo..." />
                </div>
              )}

              {!conversionResult && !ratesLoading && (
                <div className="text-center text-gray-400 py-6 italic">
                  Ingresa un monto para ver la conversión
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
