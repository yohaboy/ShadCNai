'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

type Session = typeof auth.$Infer.Session;

export default function Navigation({ session }:{session:Session | null}) {
  const router = useRouter();
  const  handleSignout = async () => {
      await signOut()
      router.push("/auth/login")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" mx-16 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-extrabold text-xl hover:cursor-pointer">VibeCN</Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            Home
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
            Pricing
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
            About
          </Link>
          <Link href="contact" className="text-sm text-muted-foreground hover:text-foreground transition">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="text-sm">Hi, {session.user.name}</span>

              <Button
                onClick={handleSignout}
                className="flex items-center gap-2 text-sm  bg-accent hover:text-accent-foreground"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="text-sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
