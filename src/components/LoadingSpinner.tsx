/**
 * Loading spinner component
 */

import type { LoadingSpinnerProps } from '../types';
import './LoadingSpinner.module.css';

export const LoadingSpinner = ({
  size = 'medium',
  text,
}: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__spinner" role="status" aria-label="Loading">
        <div className="loading-spinner__circle"></div>
      </div>
      {text && (
        <span className="loading-spinner__text" aria-live="polite">
          {text}
        </span>
      )}
    </div>
  );
};
