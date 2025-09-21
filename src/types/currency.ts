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

// ===== NEW TYPES FOR JSON-BASED CONFIGURATION =====

// Real currency configuration from JSON
export interface RealCurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  isBase: boolean;
  flag: string;
  color: string;
}

// Fictional currency configuration from JSON
export interface FictionalCurrencyConfig {
  code: string;
  name: string;
  namePlural: string;
  icon: string;
  usdValue: number;
  order: number;
  color: string;
}

// Conversion rule equivalence
export interface CurrencyEquivalence {
  unit: string;
  rate: number;
}

// Conversion rules configuration
export interface ConversionRule {
  baseUnit: boolean;
  equivalences: CurrencyEquivalence[];
}

// Currency configuration metadata
export interface CurrencyConfigMetadata {
  version: string;
  lastUpdated: string;
  description: string;
}

// Complete currency configuration structure
export interface CurrencyConfiguration {
  realCurrencies: Record<string, RealCurrencyConfig>;
  fictionalCurrencies: Record<string, FictionalCurrencyConfig>;
  conversionRules: Record<string, ConversionRule>;
  metadata: CurrencyConfigMetadata;
}

// Hook state for currency configuration
export interface CurrencyConfigState {
  config: CurrencyConfiguration | null;
  isLoading: boolean;
  error: string | null;
}
