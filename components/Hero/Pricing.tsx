'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      price: '29',
      features: [
        'Up to 3 projects',
        '5GB storage',
        'Basic AI suggestions',
        'Community support',
        'Core features',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing teams and serious builders',
      price: '79',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced AI features',
        'Priority support',
        'Team collaboration',
        'Custom domains',
        'Analytics dashboard',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Dedicated support',
        'SSO & advanced security',
        'Custom integrations',
        'SLA guarantee',
        'Audit logs',
      ],
      popular: false,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground">Choose the perfect plan for your needs. Always flexible to scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl border transition-all duration-300 ${
                plan.popular
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105'
                  : 'border-border/50 hover:border-primary/50'
              } p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price !== 'Custom' ? (
                    <>
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Contact us</span>
                  )}
                </div>
              </div>

              <Link href="/register" className="mb-8 w-full">
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get started
                </Button>
              </Link>

              <div className="space-y-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
