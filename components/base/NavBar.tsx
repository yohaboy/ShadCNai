'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

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
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Code
          </Link>
          <Link href="contact" className="text-sm text-muted-foreground hover:text-foreground transition">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="text-sm font-semibold">Hi, {session.user.name}</span>

              <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} className="w-48 rounded-xl shadow-lg">
                  <DropdownMenuLabel className="font-semibold text-sm">My Account</DropdownMenuLabel>
                  
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>router.push('/profile')} className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>router.push('/profile')} className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignout} className="flex items-center gap-2 text-red-600 focus:text-red-700">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
