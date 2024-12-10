// components/error-boundary.tsx
'use client';
import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4 text-center max-w-md">
            Maaf, terjadi kesalahan saat memuat konten. 
            Silakan coba lagi dalam beberapa saat.
          </p>
          <Button onClick={this.handleRetry}>
            Coba Lagi
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}