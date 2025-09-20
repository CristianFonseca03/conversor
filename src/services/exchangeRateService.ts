/**
 * Service for providing fixed exchange rates
 */

import type { ExchangeRates } from "../types";

// Fixed exchange rates
const FIXED_EXCHANGE_RATES = {
  USD: 1, // Base currency
  COP: 3900, // 1 USD = 3900 COP
  MXN: 18.4, // 1 USD = 18.40 MXN
};

/**
 * Returns fixed exchange rates
 * @returns Promise with exchange rates
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  // Simulate a small delay to maintain the same interface
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    USD: FIXED_EXCHANGE_RATES.USD,
    COP: FIXED_EXCHANGE_RATES.COP,
    MXN: FIXED_EXCHANGE_RATES.MXN,
    lastUpdated: new Date().toISOString().split("T")[0], // Today's date
  };
}

/**
 * Converts an amount from one currency to USD using exchange rates
 */
export function convertToUSD(
  amount: number,
  fromCurrency: "USD" | "COP" | "MXN",
  rates: ExchangeRates
): number {
  if (fromCurrency === "USD") {
    return amount;
  }

  const rate = rates[fromCurrency];
  if (!rate || rate === 0) {
    throw new Error(`Exchange rate not available for ${fromCurrency}`);
  }

  return amount / rate;
}
