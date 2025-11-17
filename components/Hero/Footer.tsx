'use client'

import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4">
        {/* Social links */}
        <div className="flex gap-6 text-muted-foreground">
          <Link href="https://twitter.com" target="_blank" className="hover:text-foreground transition">
            <FaTwitter size={20} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-foreground transition">
            <FaLinkedin size={20} />
          </Link>
          <Link href="https://github.com" target="_blank" className="hover:text-foreground transition">
            <FaGithub size={20} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center">
          &copy; {currentYear} VibeCN. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
