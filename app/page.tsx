import type { Metadata } from "next"
import "./globals.css"
import Navigation from "@/components/base/NavBar"
import Hero from "@/components/Hero/Home"
import Features from "@/components/Hero/Features"
import Stats from "@/components/Hero/Stats"
import Footer from "@/components/Hero/Footer"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "VibeCN",
}


export default async function Home() {
  const session = await auth.api.getSession({
    headers:await headers(),
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation session={session} />
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </main>
  )
}
