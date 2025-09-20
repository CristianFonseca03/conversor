/**
 * Loading spinner component
 */

import type { LoadingSpinnerProps } from "../types";

export const LoadingSpinner = ({
  size = "medium",
  text,
}: LoadingSpinnerProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-6 h-6";
      case "large":
        return "w-12 h-12";
      default:
        return "w-8 h-8";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="relative">
        <div
          className={`
            ${getSizeClasses()} 
            border-3 border-gray-100 border-t-primary-500 rounded-full 
            animate-spin motion-reduce:animate-none motion-reduce:border-t-primary-500
          `}
          role="status"
          aria-label="Loading"
        />
      </div>
      {text && (
        <span className="text-gray-500 text-sm text-center" aria-live="polite">
          {text}
        </span>
      )}
    </div>
  );
};
