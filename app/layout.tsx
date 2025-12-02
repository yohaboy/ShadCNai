import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VibeCN',
  description: 'shadcn based frontend for builder.ai',
  generator: 'VibeCN',
  icons: {
    icon: [
      {
        url: '/shadcn.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/shadcn.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/shadcn.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/shadcn.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
