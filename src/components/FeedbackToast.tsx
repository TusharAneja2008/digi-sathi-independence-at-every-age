import React, { useEffect } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext.js';
import { CheckCircle2, AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';

export const FeedbackToast: React.FC = () => {
  const { feedback, clearFeedback } = useAccessibility();

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        clearFeedback();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback, clearFeedback]);

  if (!feedback) return null;

  const getIcon = () => {
    switch (feedback.type) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-700 dark:text-green-400 flex-shrink-0" aria-hidden="true" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0" aria-hidden="true" />;
      case 'error':
        return <AlertOctagon className="w-6 h-6 text-red-700 dark:text-red-400 flex-shrink-0" aria-hidden="true" />;
      default:
        return <Info className="w-6 h-6 text-blue-700 dark:text-blue-400 flex-shrink-0" aria-hidden="true" />;
    }
  };

  const getBadgeText = () => {
    switch (feedback.type) {
      case 'success':
        return 'SUCCESS';
      case 'warning':
        return 'WARNING';
      case 'error':
        return 'ERROR';
      default:
        return 'NOTE';
    }
  };

  const getContainerStyles = () => {
    switch (feedback.type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-500 text-emerald-950 dark:bg-emerald-950/80 dark:border-emerald-400 dark:text-emerald-100';
      case 'warning':
        return 'bg-amber-50 border-amber-500 text-amber-950 dark:bg-amber-950/80 dark:border-amber-400 dark:text-amber-100';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-950 dark:bg-red-950/80 dark:border-red-400 dark:text-red-100';
      default:
        return 'bg-sky-50 border-sky-500 text-sky-950 dark:bg-sky-950/80 dark:border-sky-400 dark:text-sky-100';
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 transition-all duration-300"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border-2 shadow-xl ${getContainerStyles()}`}
      >
        {getIcon()}
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-wider block mb-1">
            [{getBadgeText()}]
          </span>
          <p className="text-base font-medium leading-snug">{feedback.message}</p>
        </div>
        <button
          onClick={clearFeedback}
          aria-label="Close message"
          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-current transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
