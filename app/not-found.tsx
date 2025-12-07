import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-neutral-900 rounded-2xl shadow-2xl p-8 space-y-6 border border-neutral-800">
          <div className="flex justify-center">
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="space-y-1">
              <div className="text-sm font-mono text-neutral-500">ERROR 404</div>
              <h1 className="text-2xl font-bold text-white">
                Page Not Found
              </h1>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a different location.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/"
              className="block w-full bg-white hover:bg-neutral-100 text-black font-medium py-3 px-4 rounded-lg transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <p className="text-xs text-center text-neutral-500">
              If you believe this is an error, please contact support
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}