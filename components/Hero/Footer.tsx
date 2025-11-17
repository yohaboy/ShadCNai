'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                BF
              </div>
              <span className="font-semibold">BuilderFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">Build faster, ship smarter with AI-powered tools.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">API</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Security</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            &copy; 2025 BuilderFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
