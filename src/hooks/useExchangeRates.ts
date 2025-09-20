/**
 * Custom hook for managing fixed exchange rates
 */

import { useState, useEffect, useCallback } from "react";
import type { ExchangeRates, LoadingState } from "../types";
import { fetchExchangeRates } from "../services/exchangeRateService";

interface UseExchangeRatesReturn extends LoadingState {
  exchangeRates: ExchangeRates | null;
  refetch: () => void;
}

export function useExchangeRates(): UseExchangeRatesReturn {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const rates = await fetchExchangeRates();
      setExchangeRates(rates);
    } catch (err) {
      // This should rarely happen with fixed rates, but keeping for safety
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load exchange rates";
      setError(errorMessage);
      console.error("Error loading exchange rates:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchRates();
  }, [fetchRates]);

  // Load rates on component mount
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return {
    exchangeRates,
    isLoading,
    error,
    refetch,
  };
}
