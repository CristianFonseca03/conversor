/**
 * Exchange rates display component
 */

import type { ExchangeRatesDisplayProps } from '../types';
import { formatRealCurrency } from '../utils/currencyUtils';
import { LoadingSpinner } from './LoadingSpinner';
import './ExchangeRatesDisplay.module.css';

export const ExchangeRatesDisplay = ({
  rates,
  isLoading,
}: ExchangeRatesDisplayProps) => {
  if (isLoading) {
    return (
      <div className="exchange-rates exchange-rates--loading">
        <LoadingSpinner size="small" text="Loading rates..." />
      </div>
    );
  }

  if (!rates) {
    return (
      <div className="exchange-rates exchange-rates--error">
        <p className="exchange-rates__error">
          Unable to load exchange rates
        </p>
      </div>
    );
  }

  return (
    <div className="exchange-rates">
      <h3 className="exchange-rates__title">Current Exchange Rates</h3>
      <p className="exchange-rates__subtitle">
        Updated: {new Date(rates.lastUpdated).toLocaleDateString()}
      </p>
      
      <div className="exchange-rates__list">
        <div className="exchange-rates__item">
          <span className="exchange-rates__label">1 USD =</span>
          <span className="exchange-rates__value">
            {formatRealCurrency(rates.COP, 'COP')}
          </span>
        </div>
        
        <div className="exchange-rates__item">
          <span className="exchange-rates__label">1 USD =</span>
          <span className="exchange-rates__value">
            {formatRealCurrency(rates.MXN, 'MXN')}
          </span>
        </div>
      </div>
    </div>
  );
};
