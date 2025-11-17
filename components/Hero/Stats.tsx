'use client'

export default function Stats() {
  const stats = [
    { label: '20 days', description: 'saved on daily builds' },
    { label: '98%', description: 'faster time to market' },
    { label: '300%', description: 'increase in SEO' },
    { label: '6x', description: 'faster to build + deploy' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.label}</div>
              <p className="text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
