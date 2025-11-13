export const PROJECT_TEMPLATES = {
  nextjs: {
    "app/page.tsx": `'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
      <p className="text-lg text-gray-600">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Increment
      </button>
    </main>
  )
}`,
    "app/layout.tsx": `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My AI Project',
  description: 'Created with AI Project Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
    "app/globals.css": `@import 'tailwindcss';

* {
  @apply border-border;
}

body {
  @apply bg-white text-gray-900;
}`,
    "package.json": `{
  "name": "ai-project",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^16.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`,
  },
  react: {
    "src/index.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
    "src/App.tsx": `import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">React App</h1>
      <p className="text-lg mb-4">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Increment
      </button>
    </div>
  )
}`,
    "package.json": `{
  "name": "react-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
  },
  blank: {},
}
