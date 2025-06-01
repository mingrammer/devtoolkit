import React, { Component, ErrorInfo, ReactNode } from 'react';
import { safeLog } from '@/utils/environment';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class AnalyticsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    safeLog.error('Analytics component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 폴백 UI
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">📊 Analytics component unavailable</p>
          <p className="text-xs text-gray-400 mt-1">
            This is normal in development or when using ad blockers
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AnalyticsErrorBoundary;
