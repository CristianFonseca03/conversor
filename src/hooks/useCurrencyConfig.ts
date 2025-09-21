/**
 * Custom hook for loading and managing currency configuration from JSON
 */

import { useState, useEffect } from 'react';
import type { 
  CurrencyConfiguration, 
  CurrencyConfigState,
  RealCurrencyConfig,
  FictionalCurrencyConfig
} from '../types';

// Import the currency configuration JSON
import currencyConfigData from '../data/currencies.json';

/**
 * Hook to load and provide currency configuration
 */
export function useCurrencyConfig(): CurrencyConfigState {
  const [state, setState] = useState<CurrencyConfigState>({
    config: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      // Validate the loaded configuration
      const config = currencyConfigData as CurrencyConfiguration;
      
      if (!config.realCurrencies || !config.fictionalCurrencies || !config.conversionRules) {
        throw new Error('Invalid currency configuration format');
      }

      setState({
        config,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        config: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load currency configuration',
      });
    }
  }, []);

  return state;
}

/**
 * Hook to get real currencies configuration with helper functions
 */
export function useRealCurrencies() {
  const { config, isLoading, error } = useCurrencyConfig();

  const getRealCurrency = (code: string): RealCurrencyConfig | undefined => {
    return config?.realCurrencies[code];
  };

  const getAllRealCurrencies = (): RealCurrencyConfig[] => {
    if (!config) return [];
    return Object.values(config.realCurrencies);
  };

  const getBaseCurrency = (): RealCurrencyConfig | undefined => {
    if (!config) return undefined;
    return Object.values(config.realCurrencies).find(currency => currency.isBase);
  };

  return {
    currencies: config?.realCurrencies || {},
    isLoading,
    error,
    getRealCurrency,
    getAllRealCurrencies,
    getBaseCurrency,
  };
}

/**
 * Hook to get fictional currencies configuration with helper functions
 */
export function useFictionalCurrencies() {
  const { config, isLoading, error } = useCurrencyConfig();

  const getFictionalCurrency = (code: string): FictionalCurrencyConfig | undefined => {
    return config?.fictionalCurrencies[code];
  };

  const getAllFictionalCurrencies = (): FictionalCurrencyConfig[] => {
    if (!config) return [];
    return Object.values(config.fictionalCurrencies).sort((a, b) => a.order - b.order);
  };

  const getFictionalCurrencyByValue = (usdValue: number): FictionalCurrencyConfig | undefined => {
    if (!config) return undefined;
    return Object.values(config.fictionalCurrencies).find(currency => currency.usdValue === usdValue);
  };

  return {
    currencies: config?.fictionalCurrencies || {},
    isLoading,
    error,
    getFictionalCurrency,
    getAllFictionalCurrencies,
    getFictionalCurrencyByValue,
  };
}

/**
 * Hook to get conversion rules with helper functions
 */
export function useConversionRules() {
  const { config, isLoading, error } = useCurrencyConfig();

  const getConversionRule = (currencyCode: string) => {
    return config?.conversionRules[currencyCode];
  };

  const getBaseUnit = () => {
    if (!config) return undefined;
    const baseRule = Object.entries(config.conversionRules).find(([, rule]) => rule.baseUnit);
    return baseRule ? baseRule[0] : undefined;
  };

  const getEquivalenceRate = (fromCurrency: string, toCurrency: string): number | undefined => {
    const rule = getConversionRule(fromCurrency);
    if (!rule) return undefined;
    
    const equivalence = rule.equivalences.find(eq => eq.unit === toCurrency);
    return equivalence?.rate;
  };

  return {
    rules: config?.conversionRules || {},
    isLoading,
    error,
    getConversionRule,
    getBaseUnit,
    getEquivalenceRate,
  };
}
