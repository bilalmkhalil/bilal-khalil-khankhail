import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07070A] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white/20 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-white/60 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors inline-block"
          >
            Go back home
          </Link>
          <Link
            href="/#projects"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20 inline-block"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
