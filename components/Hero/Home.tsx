'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
          <span className="text-sm font-medium text-primary"> Vibe the right way</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance">
          The Platform to Build the Web
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Empower your entire organization to create at the speed of thought, while ensuring security remains at the forefront.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/register">
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
