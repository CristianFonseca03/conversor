/**
 * Main Currency Converter Application
 */

import {
  CurrencySelector,
  AmountInput,
  ConversionResult,
  ExchangeRatesDisplay,
  ErrorDisplay,
} from "./components";
import { useExchangeRates, useCurrencyConverter } from "./hooks";

function App() {
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

  const handleRetry = () => {
    refetch();
    resetConverter();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-app font-sans">
      <header className="text-center py-8 px-4 pb-4 text-white">
        <h1 className="text-4xl font-extrabold m-0 mb-2 text-shadow-lg tracking-tight">
          🪿🤡🕷️ Currency Converter
        </h1>
        <p className="text-lg m-0 opacity-90 max-w-xl mx-auto leading-relaxed">
          Convert real currencies to fictional Gansitos, Balatros, and Silksongs
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center gap-8 py-8 px-4 max-w-6xl mx-auto w-full">
        {(ratesError || conversionError) && (
          <ErrorDisplay
            error={ratesError || conversionError}
            onRetry={ratesError ? handleRetry : undefined}
          />
        )}

        <div className="grid grid-cols-2 gap-8 w-full lg:grid-cols-1 lg:gap-6">
          <div className="flex flex-col items-center gap-6">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              disabled={ratesLoading}
            />

            <AmountInput
              amount={amount}
              onAmountChange={setAmount}
              disabled={ratesLoading}
              placeholder="Enter amount to convert..."
            />
          </div>

          <div className="flex justify-center">
            <ConversionResult
              result={conversionResult}
              isLoading={ratesLoading && !!amount}
            />
          </div>
        </div>

        <aside className="flex justify-center w-full">
          <ExchangeRatesDisplay
            rates={exchangeRates}
            isLoading={ratesLoading}
          />
        </aside>
      </main>

      <footer className="text-center py-6 px-4 text-white bg-black bg-opacity-10">
        <p className="text-sm m-0 mb-2 opacity-90">
          Fixed exchange rates: 1 USD = 3,900 COP | 1 USD = 18.40 MXN
        </p>
        <p className="text-xs m-0 opacity-75">
          1 Gansito = $1 USD | 1 Balatro = 10 Gansitos | 1 Silksong = 2 Balatros
        </p>
      </footer>
    </div>
  );
}

export default App;
