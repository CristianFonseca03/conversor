/**
 * Type definitions for application state and components
 */

export interface AppState {
  selectedCurrency: import("./currency").RealCurrency;
  amount: string;
  exchangeRates: import("./currency").ExchangeRates | null;
  conversionResult: import("./currency").ConversionResult | null;
  isLoading: boolean;
  error: string | null;
}

// Component prop types
export interface CurrencySelectorProps {
  selectedCurrency: import("./currency").RealCurrency;
  onCurrencyChange: (currency: import("./currency").RealCurrency) => void;
  disabled?: boolean;
}

export interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface ConversionResultProps {
  result: import("./currency").ConversionResult | null;
  isLoading: boolean;
}

export interface ExchangeRatesDisplayProps {
  rates: import("./currency").ExchangeRates | null;
  isLoading: boolean;
}

export interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
}

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
}
