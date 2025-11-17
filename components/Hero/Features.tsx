'use client'

export default function Features() {
  const features = [
    {
      title: 'AI-Powered Development',
      description: 'Get intelligent code suggestions and automation powered by cutting-edge AI technology.',
      icon: '🤖',
    },
    {
      title: 'Seamless Collaboration',
      description: 'Work together in real-time with your team and share feedback instantly.',
      icon: '👥',
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security with SSO, audit logs, and compliance certifications.',
      icon: '🔒',
    },
    {
      title: 'Performance First',
      description: 'Optimized for speed with automatic optimization and monitoring built-in.',
      icon: '⚡',
    },
    {
      title: 'Developer Friendly',
      description: 'Comprehensive APIs and documentation for seamless integration.',
      icon: '👨‍💻',
    },
    {
      title: '24/7 Support',
      description: 'Get help when you need it from our dedicated support team.',
      icon: '💬',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need</h2>
          <p className="text-lg text-muted-foreground">Powerful features designed to help you build faster and better.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition duration-300 space-y-3"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
