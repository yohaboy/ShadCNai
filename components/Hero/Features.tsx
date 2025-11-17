'use client'

export default function Features() {
  const features = [
    {
      title: "Autonomous UI Generation",
      description:
        "Describe a component and get production-ready shadcn UI, TypeScript, and Tailwind code — structurally clean, linted, and instantly usable.",
      icon: "🎨",
    },
    {
      title: "Not Your Average Purple AI UI",
      description:
        "No glowing gradients, no galaxy-brain marketing fluff. Just an AI that actually writes code instead of trying to hypnotize you with neon blobs.",
      icon: "🛠️",
    },
    {
      title: "Fairprice",
      description:
        "Transparent, usage-based compute with no hidden surcharges. Scale AI generation up or down without unpredictable billing or vendor traps.",
      icon: "💰",
    },
    {
      title: "Real-Time AI Refactoring",
      description:
        "Continuously improves your codebase with pattern-level refactors, dead-code detection, and architecture suggestions aligned with Next.js best practices.",
      icon: "🧠",
    },
    {
      title: "Component Intelligence",
      description:
        "Understands your design system and generates reusable variants, states, and interaction logic without breaking existing layouts.",
      icon: "🧩",
    },
    {
      title: "Action-Aware Editing",
      description:
        "AI understands your file structure, routing, and data dependencies — edits multiple files coherently and keeps everything type-safe.",
      icon: "🗂️",
    }
  ];


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need to vibe</h2>
          <p className="text-lg text-muted-foreground">Powerful features designed to help you build faster and better.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition duration-300 space-y-3"
            >
              <div className="text-4xl inline-block filter grayscale-68 brightness-75 contrast-125">{feature.icon}</div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
