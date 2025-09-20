/**
 * Type definitions for currency conversion application
 */

// Real currency types
export type RealCurrency = "USD" | "COP" | "MXN";

// Fictional currency units
export type FictionalCurrencyUnit = "gansito" | "balatro" | "silksong";

// Icons mapping for fictional currencies
export type CurrencyIcon = "🪿" | "🤡" | "🕷️";

// Exchange rates state (using fixed values)
export interface ExchangeRates {
  USD: number;
  COP: number;
  MXN: number;
  lastUpdated: string;
}

// Fictional currency breakdown
export interface FictionalCurrency {
  silksongs: number;
  balatros: number;
  gansitos: number;
}

// Conversion input
export interface ConversionInput {
  amount: number;
  fromCurrency: RealCurrency;
}

// Conversion result
export interface ConversionResult {
  originalAmount: number;
  originalCurrency: RealCurrency;
  usdEquivalent: number;
  fictionalCurrency: FictionalCurrency;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Currency display information
export interface CurrencyDisplayInfo {
  code: RealCurrency;
  name: string;
  symbol: string;
}

// Fictional currency display information
export interface FictionalCurrencyDisplayInfo {
  unit: FictionalCurrencyUnit;
  icon: CurrencyIcon;
  name: string;
  usdValue: number;
}
