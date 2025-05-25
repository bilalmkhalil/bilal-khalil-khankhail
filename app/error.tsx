"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#07070A] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
          <h2 className="text-2xl text-white/80 mb-4">Something went wrong</h2>
          <p className="text-white/60 max-w-md mx-auto">
            We encountered an unexpected error. Don't worry, it's not your fault.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
