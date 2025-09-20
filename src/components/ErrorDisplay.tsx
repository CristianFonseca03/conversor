/**
 * Error display component
 */

import type { ErrorDisplayProps } from '../types';
import './ErrorDisplay.module.css';

export const ErrorDisplay = ({
  error,
  onRetry,
}: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className="error-display" role="alert">
      <div className="error-display__icon">⚠️</div>
      <div className="error-display__content">
        <h3 className="error-display__title">Something went wrong</h3>
        <p className="error-display__message">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="error-display__retry-button"
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
