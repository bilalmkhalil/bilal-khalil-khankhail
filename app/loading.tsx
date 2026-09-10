export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-ink/20 border-t-ink animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-ink/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
