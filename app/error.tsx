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
          <pre className="font-mono text-xs text-white/70">
            {`try {
  // Something went wrong
} catch (error) {
  console.error(error);
}`}
          </pre>
        </div>
      </div>

      <div className="absolute top-1/3 right-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="font-mono text-xs text-white/70">
            {`if (error) {
  handleError(error);
  retry();
}`}
          </pre>
        </div>
      </div>

      <div className="absolute bottom-32 left-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="font-mono text-xs text-white/70">
            {`// Let's try again
return <Success />;`}
          </pre>
        </div>
      </div>

      {/* Main content */}
      <div className="relative m-auto flex h-screen w-10/12 items-center justify-center">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Status badge */}
          <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <span className="relative">
              <span className="absolute top-1/2 -left-2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-red-400"></span>
              <span className="ml-2">Something went wrong</span>
            </span>
          </div>

          {/* Main Error Display */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="mb-4 bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-[8rem] leading-none font-black text-transparent select-none sm:text-[10rem] lg:text-[12rem]">
                Error
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
              Oops! Something Went Wrong
            </h2>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
              We encountered an unexpected error. Don&apos;t worry, it&apos;s not your
              fault. Let&apos;s try to get things back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={reset}
              className="group relative overflow-hidden rounded-full border border-white/20 bg-white/15 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:ring-2 focus:ring-white/50 focus:outline-none"
            >
              <span className="relative z-10">Try Again</span>
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-white/50 focus:outline-none"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-16 left-16 hidden h-24 w-24 animate-pulse rounded-full border border-white/10 bg-white/5 backdrop-blur-sm lg:block"></div>
      <div className="absolute top-16 right-24 hidden h-32 w-32 animate-pulse rounded-full border border-white/10 bg-white/5 backdrop-blur-sm lg:block"></div>
      <div className="absolute right-8 bottom-32 hidden h-16 w-16 rotate-45 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm lg:block"></div>
    </section>
  );
}
