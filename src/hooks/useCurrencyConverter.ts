/**
 * Custom hook for currency conversion logic
 */

import { useState, useCallback, useMemo } from "react";
import type { RealCurrency, ConversionResult, ExchangeRates } from "../types";
import {
  convertRealToFictionalCurrency,
  isValidAmount,
  parseAmount,
} from "../utils/currencyUtils";

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
  const [selectedCurrency, setSelectedCurrency] = useState<RealCurrency>("USD");
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

      const result = convertRealToFictionalCurrency(
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
  }, [amount, selectedCurrency, exchangeRates]);

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
