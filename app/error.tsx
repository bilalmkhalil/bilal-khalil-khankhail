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
    <section className="relative h-screen overflow-hidden bg-[#07070A]">
      {/* Floating code blocks */}
      <div className="absolute top-20 left-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="text-xs text-white/70 font-mono">
            {`try {
  // Something went wrong
} catch (error) {
  console.error(error);
}`}
          </pre>
        </div>
      </div>
      
      <div className="absolute right-8 top-1/3 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="text-xs text-white/70 font-mono">
            {`if (error) {
  handleError(error);
  retry();
}`}
          </pre>
        </div>
      </div>

      <div className="absolute left-8 bottom-32 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="text-xs text-white/70 font-mono">
            {`// Let's try again
return <Success />;`}
          </pre>
        </div>
      </div>

      {/* Main content */}
      <div className="relative m-auto w-10/12 flex items-center justify-center h-screen">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Status badge */}
          <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm border border-white/10">
            <span className="relative">
              <span className="absolute -left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-400 animate-pulse"></span>
              <span className="ml-2">Something went wrong</span>
            </span>
          </div>

          {/* Main Error Display */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-black bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-transparent leading-none select-none mb-4">
                Error
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Oops! Something Went Wrong
            </h2>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              We encountered an unexpected error. Don't worry, it's not your fault.
              Let's try to get things back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={reset}
              className="group relative rounded-full bg-white/15 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 hover:border-white/30 overflow-hidden"
            >
              <span className="relative z-10">Try Again</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-16 left-16 h-24 w-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-pulse hidden lg:block"></div>
      <div className="absolute top-16 right-24 h-32 w-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 right-8 h-16 w-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm rotate-45 hidden lg:block"></div>
    </section>
  );
}
