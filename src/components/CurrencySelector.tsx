/**
 * Currency selector component
 */

import type { CurrencySelectorProps } from '../types';
import { REAL_CURRENCIES } from '../utils/currencyUtils';
import './CurrencySelector.module.css';

export const CurrencySelector = ({
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
}: CurrencySelectorProps) => {
  return (
    <div className="currency-selector">
      <label htmlFor="currency-select" className="currency-selector__label">
        Select Currency:
      </label>
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value as keyof typeof REAL_CURRENCIES)}
        disabled={disabled}
        className="currency-selector__select"
        aria-describedby="currency-selector-help"
      >
        {Object.entries(REAL_CURRENCIES).map(([code, info]) => (
          <option key={code} value={code}>
            {info.name} ({code})
          </option>
        ))}
      </select>
      <small id="currency-selector-help" className="currency-selector__help">
        Choose the currency you want to convert from
      </small>
    </div>
  );
};
