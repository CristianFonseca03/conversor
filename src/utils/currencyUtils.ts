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
} from "../types";

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

/**
 * Converts USD amount to fictional currency breakdown
 */
export function convertUSDToFictionalCurrency(
  usdAmount: number
): FictionalCurrency {
  if (usdAmount < 0) {
    throw new Error("Amount cannot be negative");
  }

  // Calculate silksongs (highest denomination)
  const silksongs = Math.floor(
    usdAmount / FICTIONAL_CURRENCIES.silksong.usdValue
  );
  let remaining =
    usdAmount - silksongs * FICTIONAL_CURRENCIES.silksong.usdValue;

  // Calculate balatros
  const balatros = Math.floor(
    remaining / FICTIONAL_CURRENCIES.balatro.usdValue
  );
  remaining = remaining - balatros * FICTIONAL_CURRENCIES.balatro.usdValue;

  // Calculate gansitos (smallest denomination)
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
 */
export function formatFictionalCurrency(fictional: FictionalCurrency): string {
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
