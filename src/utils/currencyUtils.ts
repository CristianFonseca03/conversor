/**
 * Utility functions for currency conversion and fictional currency calculations
 */

import type {
  FictionalCurrency,
  ConversionResult,
  RealCurrency,
  ExchangeRates,
  FictionalCurrencyDisplayInfo,
  CurrencyDisplayInfo,
  CurrencyConfiguration,
} from "../types";

// Import configuration JSON
import currencyConfigData from '../data/currencies.json';

// Helper function to get configuration
function getCurrencyConfig(): CurrencyConfiguration | null {
  try {
    return currencyConfigData as CurrencyConfiguration;
  } catch {
    return null;
  }
}

// ===== LEGACY CONSTANTS (kept for backward compatibility) =====

// Fictional currency exchange rates (in USD)
export const FICTIONAL_CURRENCY_RATES = {
  GANSITO_USD: 1, // 1 gansito = 1 USD
  BALATRO_GANSITOS: 10, // 1 balatro = 10 gansitos
  SILKSONG_BALATROS: 2, // 1 silksong = 2 balatros
} as const;

// Real currency display information
export const REAL_CURRENCIES: Record<RealCurrency, CurrencyDisplayInfo> = {
  USD: { code: "USD", name: "US Dollar", symbol: "$" },
  COP: { code: "COP", name: "Colombian Peso", symbol: "$" },
  MXN: { code: "MXN", name: "Mexican Peso", symbol: "$" },
};

// Fictional currency display information
export const FICTIONAL_CURRENCIES: Record<
  string,
  FictionalCurrencyDisplayInfo
> = {
  gansito: { unit: "gansito", icon: "🪿", name: "Gansito", usdValue: 1 },
  balatro: { unit: "balatro", icon: "🤡", name: "Balatro", usdValue: 10 },
  silksong: { unit: "silksong", icon: "🕷️", name: "Silksong", usdValue: 20 }, // 2 balatros = 20 gansitos
};

// ===== NEW CONFIGURATION-BASED FUNCTIONS =====

/**
 * Converts USD amount to fictional currency breakdown using configuration
 */
export function convertUSDToFictionalCurrencyWithConfig(
  usdAmount: number,
  config: CurrencyConfiguration
): FictionalCurrency {
  if (usdAmount < 0) {
    throw new Error("Amount cannot be negative");
  }

  if (!config.fictionalCurrencies) {
    throw new Error("Fictional currencies configuration not available");
  }

  // Get fictional currencies sorted by USD value (highest first)
  const currencies = Object.values(config.fictionalCurrencies)
    .sort((a, b) => b.usdValue - a.usdValue);

  // Initialize result
  const result: FictionalCurrency = {
    silksongs: 0,
    balatros: 0,
    gansitos: 0,
  };

  let remaining = usdAmount;

  // Calculate each currency denomination
  for (const currency of currencies) {
    const amount = Math.floor(remaining / currency.usdValue);
    remaining = remaining - (amount * currency.usdValue);
    
    // Map to result object based on currency code (lowercase)
    switch (currency.code.toLowerCase()) {
      case 'silksong':
        result.silksongs = amount;
        break;
      case 'balatro':
        result.balatros = amount;
        break;
      case 'gansito':
        result.gansitos = amount;
        break;
    }
  }

  return result;
}

/**
 * Converts real currency to fictional currency using exchange rates and configuration
 */
export function convertRealToFictionalCurrencyWithConfig(
  amount: number,
  fromCurrency: RealCurrency,
  exchangeRates: ExchangeRates,
  config: CurrencyConfiguration
): ConversionResult {
  if (amount < 0) {
    throw new Error("Amount cannot be negative");
  }

  if (!exchangeRates) {
    throw new Error("Exchange rates not available");
  }

  if (!config) {
    throw new Error("Currency configuration not available");
  }

  // Convert to USD first
  let usdEquivalent: number;

  if (fromCurrency === "USD") {
    usdEquivalent = amount;
  } else {
    const rate = exchangeRates[fromCurrency];
    if (!rate || rate === 0) {
      throw new Error(`Exchange rate not available for ${fromCurrency}`);
    }
    usdEquivalent = amount / rate;
  }

  // Convert USD to fictional currency using configuration
  const fictionalCurrency = convertUSDToFictionalCurrencyWithConfig(usdEquivalent, config);

  return {
    originalAmount: amount,
    originalCurrency: fromCurrency,
    usdEquivalent,
    fictionalCurrency,
  };
}

/**
 * Formats fictional currency amount for display using configuration
 */
export function formatFictionalCurrencyWithConfig(
  fictional: FictionalCurrency,
  config: CurrencyConfiguration
): string {
  if (!config.fictionalCurrencies) {
    return formatFictionalCurrency(fictional); // fallback to legacy version
  }

  const parts: string[] = [];

  // Get currencies in display order
  const currencies = Object.values(config.fictionalCurrencies)
    .sort((a, b) => a.order - b.order);

  for (const currency of currencies) {
    let amount: number;
    
    switch (currency.code) {
      case 'silksong':
        amount = fictional.silksongs;
        break;
      case 'balatro':
        amount = fictional.balatros;
        break;
      case 'gansito':
        amount = fictional.gansitos;
        break;
      default:
        continue;
    }

    if (amount > 0) {
      const name = amount === 1 ? currency.name : currency.namePlural;
      parts.push(`${amount} ${currency.icon} ${name.toLowerCase()}`);
    }
  }

  if (parts.length === 0) {
    // Try to get the base currency (smallest unit) for the fallback
    const baseCurrencies = Object.values(config.fictionalCurrencies)
      .filter(c => config.conversionRules[c.code]?.baseUnit)
      .sort((a, b) => a.usdValue - b.usdValue);
    
    const baseCurrency = baseCurrencies[0] || config.fictionalCurrencies['gansito'];
    if (baseCurrency) {
      return `0 ${baseCurrency.icon} ${baseCurrency.namePlural.toLowerCase()}`;
    }
    return "0 🪿 gansitos"; // final fallback
  }

  return parts.join(", ");
}

// ===== LEGACY FUNCTIONS (kept for backward compatibility) =====

/**
 * Converts USD amount to fictional currency breakdown
 * @deprecated Use convertUSDToFictionalCurrencyWithConfig instead
 */
export function convertUSDToFictionalCurrency(
  usdAmount: number
): FictionalCurrency {
  if (usdAmount < 0) {
    throw new Error("Amount cannot be negative");
  }

  // Try to use configuration first, fallback to hardcoded values
  const config = getCurrencyConfig();
  if (config) {
    return convertUSDToFictionalCurrencyWithConfig(usdAmount, config);
  }

  // Legacy calculation using hardcoded values
  const silksongs = Math.floor(
    usdAmount / FICTIONAL_CURRENCIES.silksong.usdValue
  );
  let remaining =
    usdAmount - silksongs * FICTIONAL_CURRENCIES.silksong.usdValue;

  const balatros = Math.floor(
    remaining / FICTIONAL_CURRENCIES.balatro.usdValue
  );
  remaining = remaining - balatros * FICTIONAL_CURRENCIES.balatro.usdValue;

  const gansitos = Math.floor(
    remaining / FICTIONAL_CURRENCIES.gansito.usdValue
  );

  return {
    silksongs,
    balatros,
    gansitos,
  };
}

/**
 * Converts real currency to fictional currency using exchange rates
 * @deprecated Use convertRealToFictionalCurrencyWithConfig instead
 */
export function convertRealToFictionalCurrency(
  amount: number,
  fromCurrency: RealCurrency,
  exchangeRates: ExchangeRates
): ConversionResult {
  if (amount < 0) {
    throw new Error("Amount cannot be negative");
  }

  if (!exchangeRates) {
    throw new Error("Exchange rates not available");
  }

  // Try to use configuration first
  const config = getCurrencyConfig();
  if (config) {
    return convertRealToFictionalCurrencyWithConfig(amount, fromCurrency, exchangeRates, config);
  }

  // Legacy conversion logic
  let usdEquivalent: number;

  if (fromCurrency === "USD") {
    usdEquivalent = amount;
  } else {
    const rate = exchangeRates[fromCurrency];
    if (!rate || rate === 0) {
      throw new Error(`Exchange rate not available for ${fromCurrency}`);
    }
    usdEquivalent = amount / rate;
  }

  // Convert USD to fictional currency
  const fictionalCurrency = convertUSDToFictionalCurrency(usdEquivalent);

  return {
    originalAmount: amount,
    originalCurrency: fromCurrency,
    usdEquivalent,
    fictionalCurrency,
  };
}

/**
 * Formats fictional currency amount for display
 * @deprecated Use formatFictionalCurrencyWithConfig instead
 */
export function formatFictionalCurrency(fictional: FictionalCurrency): string {
  // Try to use configuration first, fallback to hardcoded values
  const config = getCurrencyConfig();
  if (config) {
    return formatFictionalCurrencyWithConfig(fictional, config);
  }

  // Legacy formatting using hardcoded values
  const parts: string[] = [];

  if (fictional.silksongs > 0) {
    parts.push(
      `${fictional.silksongs} ${FICTIONAL_CURRENCIES.silksong.icon} silksong${
        fictional.silksongs !== 1 ? "s" : ""
      }`
    );
  }

  if (fictional.balatros > 0) {
    parts.push(
      `${fictional.balatros} ${FICTIONAL_CURRENCIES.balatro.icon} balatro${
        fictional.balatros !== 1 ? "s" : ""
      }`
    );
  }

  if (fictional.gansitos > 0) {
    parts.push(
      `${fictional.gansitos} ${FICTIONAL_CURRENCIES.gansito.icon} gansito${
        fictional.gansitos !== 1 ? "s" : ""
      }`
    );
  }

  if (parts.length === 0) {
    return "0 🪿 gansitos";
  }

  return parts.join(", ");
}

/**
 * Formats real currency amount for display
 */
export function formatRealCurrency(
  amount: number,
  currency: RealCurrency
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Validates if a string can be converted to a valid number
 */
export function isValidAmount(value: string): boolean {
  if (!value || value.trim() === "") return false;

  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
}

/**
 * Safely parses a string to a number
 */
export function parseAmount(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;

  const parsed = parseFloat(trimmed);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
