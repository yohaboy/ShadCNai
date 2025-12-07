import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeCN',
  description: 'shadcn based frontend for builder.ai',
  generator: 'VibeCN',
  icons: {
    icon: [
      { url: '/shadcn.png', media: '(prefers-color-scheme: light)' },
      { url: '/shadcn.png', media: '(prefers-color-scheme: dark)' },
      { url: '/shadcn.png', type: 'image/svg+xml' },
    ],
    apple: '/shadcn.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* Small-device blocker */}
        <div className="block lg:hidden h-screen w-full flex items-center justify-center p-6 bg-black">
          <div className="max-w-md mx-auto">
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
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-3">
                <h1 className="text-2xl font-bold text-white">
                  Desktop Required
                </h1>
                <p className="text-neutral-400 leading-relaxed">
                  VibeCN is optimized for desktop and laptop devices. Please access this application on a larger screen for the best experience.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-400">Full code editor experience</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-400">Advanced layout and panels</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-400">Optimal workspace for development</span>
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-800">
                <p className="text-xs text-center text-neutral-500">
                  Minimum screen width: 1024px
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content for large devices */}
        <div className="hidden lg:block min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}