/**
 * Service for providing fixed exchange rates
 */

import type { ExchangeRates, CurrencyConfiguration } from "../types";
import currencyConfigData from '../data/currencies.json';

// Fixed exchange rates (in production, this would come from a real API)
const FIXED_EXCHANGE_RATES: ExchangeRates = {
  USD: 1, // Base currency
  COP: 3900, // 1 USD = 3900 COP
  MXN: 18.4, // 1 USD = 18.40 MXN
  lastUpdated: new Date().toISOString(),
};

/**
 * Gets the base currency code from configuration
 */
function getBaseCurrency(): string {
  try {
    const config = currencyConfigData as CurrencyConfiguration;
    const baseCurrency = Object.values(config.realCurrencies).find(currency => currency.isBase);
    return baseCurrency?.code || "USD";
  } catch {
    return "USD";
  }
}

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
 * Converts an amount from one currency to base currency using exchange rates
 */
export function convertToUSD(
  amount: number,
  fromCurrency: "USD" | "COP" | "MXN",
  rates: ExchangeRates
): number {
  const baseCurrency = getBaseCurrency();
  
  if (fromCurrency === baseCurrency) {
    return amount;
  }

  const rate = rates[fromCurrency];
  if (!rate || rate === 0) {
    throw new Error(`Exchange rate not available for ${fromCurrency}`);
  }

  return amount / rate;
}
