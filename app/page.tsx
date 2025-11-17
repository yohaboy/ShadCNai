import type { Metadata } from "next"
import "./globals.css"
import Navigation from "@/components/base/NavBar"
import Hero from "@/components/Hero/Home"
import Features from "@/components/Hero/Features"
import Stats from "@/components/Hero/Stats"
import Footer from "@/components/Hero/Footer"

export const metadata: Metadata = {
  title: "AI Project Builder",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </main>
  )
}
