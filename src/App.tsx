/**
 * Main Currency Converter Application
 */

import { 
  CurrencySelector, 
  AmountInput, 
  ConversionResult, 
  ExchangeRatesDisplay, 
  ErrorDisplay 
} from './components';
import { useExchangeRates, useCurrencyConverter } from './hooks';
import './App.css';

function App() {
  const { exchangeRates, isLoading: ratesLoading, error: ratesError, refetch } = useExchangeRates();
  
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
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          🪿🤡🕷️ Currency Converter
        </h1>
        <p className="app__subtitle">
          Convert real currencies to fictional Gansitos, Balatros, and Silksongs
        </p>
      </header>

      <main className="app__main">
        {(ratesError || conversionError) && (
          <ErrorDisplay 
            error={ratesError || conversionError} 
            onRetry={ratesError ? handleRetry : undefined} 
          />
        )}

        <div className="app__converter">
          <div className="app__input-section">
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

          <div className="app__result-section">
            <ConversionResult
              result={conversionResult}
              isLoading={ratesLoading && !!amount}
            />
          </div>
        </div>

        <aside className="app__exchange-rates">
          <ExchangeRatesDisplay
            rates={exchangeRates}
            isLoading={ratesLoading}
          />
        </aside>
      </main>

      <footer className="app__footer">
        <p className="app__footer-text">
          Fixed exchange rates: 1 USD = 3,900 COP | 1 USD = 18.40 MXN
        </p>
        <p className="app__footer-conversion">
          1 Gansito = $1 USD | 1 Balatro = 10 Gansitos | 1 Silksong = 2 Balatros
        </p>
      </footer>
    </div>
  );
}

export default App;
