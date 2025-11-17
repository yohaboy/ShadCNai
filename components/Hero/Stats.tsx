'use client'

import { cn } from "@/lib/utils"

export default function Stats() {
  const stats = [
    { label: '20 days', description: 'saved on daily builds' },
    { label: '98%', description: 'faster time to market' },
    { label: '6x', description: 'faster to build + deploy' },
    { label: '10,000%', description: 'better than typical Ai designers' },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/40 bg-background">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Numbers That Actually Matter
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Real numbers backed by real builds — not marketing fluff.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center p-8 rounded-xl border border-border/30",
                "bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300"
              )}
            >
              <div className="text-5xl font-semibold tracking-tight text-foreground">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}