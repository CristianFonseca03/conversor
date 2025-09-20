/**
 * Conversion result display component
 */

import type { ConversionResultProps } from '../types';
import { formatFictionalCurrency, formatRealCurrency } from '../utils/currencyUtils';
import { LoadingSpinner } from './LoadingSpinner';
import './ConversionResult.module.css';

export const ConversionResult = ({
  result,
  isLoading,
}: ConversionResultProps) => {
  if (isLoading) {
    return (
      <div className="conversion-result conversion-result--loading">
        <LoadingSpinner size="medium" text="Converting..." />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="conversion-result conversion-result--empty">
        <p className="conversion-result__placeholder">
          Enter an amount to see the conversion result
        </p>
      </div>
    );
  }

  const { originalAmount, originalCurrency, usdEquivalent, fictionalCurrency } = result;

  return (
    <div className="conversion-result">
      <h3 className="conversion-result__title">Conversion Result</h3>
      
      <div className="conversion-result__original">
        <span className="conversion-result__label">Original Amount:</span>
        <span className="conversion-result__value">
          {formatRealCurrency(originalAmount, originalCurrency)}
        </span>
      </div>

      {originalCurrency !== 'USD' && (
        <div className="conversion-result__usd">
          <span className="conversion-result__label">USD Equivalent:</span>
          <span className="conversion-result__value">
            {formatRealCurrency(usdEquivalent, 'USD')}
          </span>
        </div>
      )}

      <div className="conversion-result__fictional">
        <span className="conversion-result__label">Fictional Currency:</span>
        <div className="conversion-result__fictional-breakdown">
          {formatFictionalCurrency(fictionalCurrency)}
        </div>
      </div>

      <div className="conversion-result__breakdown">
        <h4 className="conversion-result__breakdown-title">Breakdown:</h4>
        <ul className="conversion-result__breakdown-list">
          {fictionalCurrency.silksongs > 0 && (
            <li className="conversion-result__breakdown-item">
              🕷️ {fictionalCurrency.silksongs} Silksong{fictionalCurrency.silksongs !== 1 ? 's' : ''}
            </li>
          )}
          {fictionalCurrency.balatros > 0 && (
            <li className="conversion-result__breakdown-item">
              🤡 {fictionalCurrency.balatros} Balatro{fictionalCurrency.balatros !== 1 ? 's' : ''}
            </li>
          )}
          {fictionalCurrency.gansitos > 0 && (
            <li className="conversion-result__breakdown-item">
              🪿 {fictionalCurrency.gansitos} Gansito{fictionalCurrency.gansitos !== 1 ? 's' : ''}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
