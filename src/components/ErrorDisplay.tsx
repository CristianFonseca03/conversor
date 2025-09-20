/**
 * Error display component
 */

import type { ErrorDisplayProps } from "../types";

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div
      className="flex items-start gap-4 p-4 px-6 bg-red-50 border-2 border-red-200 rounded-xl text-red-900 my-4 max-w-lg w-full sm:p-3 sm:gap-3"
      role="alert"
    >
      <div className="text-2xl flex-shrink-0 mt-1 sm:text-xl">⚠️</div>
      <div className="flex-1">
        <h3 className="m-0 mb-2 text-base font-semibold text-red-800">
          Something went wrong
        </h3>
        <p className="m-0 mb-4 text-sm leading-6 text-red-900">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`
              bg-red-600 text-white border-none px-4 py-2 rounded-md text-sm font-semibold 
              cursor-pointer transition-colors duration-200
              hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 active:bg-red-800
            `}
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
