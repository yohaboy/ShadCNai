'use client'

import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Session = typeof auth.$Infer.Session;

export default function PricingSection({ session }:{session:Session | null}) {
  const plans = [
    { name: 'Starter', tokens: '100 tokens', price:"10$" ,popular: false },
    { name: 'Professional', tokens: '500 tokens', price:"40$" ,popular: true },
    { name: 'Enterprise', tokens: '1000 tokens', price:"70$" ,popular: false },
  ]

  const features = [
    'Unlimited AI-assisted projects',
    'AI suggestions (token-based)',
    'Core BuilderFlow features',
    'Priority support',
  ]

  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleTokenPurchase = async (tokens: string) => {
    if(!session?.user){
      router.push('/auth/login')
    }
    setLoading(true);
    let product = '';

    if (tokens === '100 tokens') {
      product = process.env.NEXT_PUBLIC_PRODUCT_ONE_SANDBOX!;
    } else if (tokens === '500 tokens') {
      product = process.env.NEXT_PUBLIC_PRODUCT_TWO_SANDBOX!;
    } else if (tokens === '1000 tokens') {
      product = process.env.NEXT_PUBLIC_PRODUCT_THREE_SANDBOX!;
    }

    await authClient.checkout({
      products : [product],
    })
    setLoading(false);
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple token-based pricing</h2>
          <p className="text-lg text-muted-foreground">Buy tokens and spend them as you need. One plan, same features, just more tokens.</p>
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
                <p className="text-sm text-muted-foreground mb-6">{}</p>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.tokens}</span>
                </div>
              </div>

              <div className="mb-8 w-full">
                <Button
                  onClick={() => handleTokenPurchase(plan.tokens)}
                  className="w-full hover:cursor-pointer"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {loading ? 'Processing...' : 'Get started'}
                </Button>
              </div>

              <div className="space-y-4 flex-1">
                {features.map((feature, featureIndex) => (
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