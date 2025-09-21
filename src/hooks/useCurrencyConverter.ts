/**
 * Custom hook for currency conversion logic
 */

import { useState, useCallback, useMemo } from "react";
import type { RealCurrency, ConversionResult, ExchangeRates } from "../types";
import {
  convertRealToFictionalCurrency,
  convertRealToFictionalCurrencyWithConfig,
  isValidAmount,
  parseAmount,
} from "../utils/currencyUtils";
import { useCurrencyConfig, useRealCurrencies } from "./useCurrencyConfig";

interface UseCurrencyConverterProps {
  exchangeRates: ExchangeRates | null;
}

interface UseCurrencyConverterReturn {
  selectedCurrency: RealCurrency;
  amount: string;
  conversionResult: ConversionResult | null;
  conversionError: string | null;
  setSelectedCurrency: (currency: RealCurrency) => void;
  setAmount: (amount: string) => void;
  resetConverter: () => void;
}

export function useCurrencyConverter({
  exchangeRates,
}: UseCurrencyConverterProps): UseCurrencyConverterReturn {
  // Load currency configuration
  const { config } = useCurrencyConfig();
  const { getBaseCurrency } = useRealCurrencies();

  // Get default currency from configuration, fallback to "USD"
  const baseCurrency = getBaseCurrency();
  const defaultCurrency = (baseCurrency?.code as RealCurrency) || "USD";

  const [selectedCurrency, setSelectedCurrency] =
    useState<RealCurrency>(defaultCurrency);
  const [amount, setAmount] = useState<string>("");
  const [conversionError, setConversionError] = useState<string | null>(null);

  const conversionResult = useMemo(() => {
    if (!amount || !isValidAmount(amount) || !exchangeRates) {
      setConversionError(null);
      return null;
    }

    try {
      const numericAmount = parseAmount(amount);
      if (numericAmount === 0) {
        setConversionError(null);
        return null;
      }

      // Use configuration-based conversion if available, otherwise fallback to legacy
      const result = config
        ? convertRealToFictionalCurrencyWithConfig(
            numericAmount,
            selectedCurrency,
            exchangeRates,
            config
          )
        : convertRealToFictionalCurrency(
            numericAmount,
            selectedCurrency,
            exchangeRates
          );

      setConversionError(null);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Conversion error";
      setConversionError(errorMessage);
      return null;
    }
  }, [amount, selectedCurrency, exchangeRates, config]);

  const resetConverter = useCallback(() => {
    setAmount("");
    setConversionError(null);
  }, []);

  const handleSetAmount = useCallback((newAmount: string) => {
    // Allow empty string and valid numeric input
    if (newAmount === "" || /^\d*\.?\d*$/.test(newAmount)) {
      setAmount(newAmount);
    }
  }, []);

  return {
    selectedCurrency,
    amount,
    conversionResult,
    conversionError,
    setSelectedCurrency,
    setAmount: handleSetAmount,
    resetConverter,
  };
}
