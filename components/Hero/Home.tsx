'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-[calc(65vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
          <span className="text-md font-extrabold text-primary"> Vibe the right way</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-balance">
          Your #1 tool to vibecode the shadcn way
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Empower your entire organization to create at the speed of thought, while ensuring security remains at the forefront.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Get started for free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Watch demo
          </Button>
        </div>
      </div>
    </section>
  )
}
