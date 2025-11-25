import Navigation from "@/components/base/NavBar";
import Footer from "@/components/Hero/Footer";
import PricingSection from "@/components/Hero/Pricing";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function PricingPage() {
  const session = await auth.api.getSession({
      headers:await headers(),
  })
  return (
    <main className="min-h-screen bg-background">
      <Navigation session={session} />
      <PricingSection session={session} />
      <Footer />
    </main>
  )
}
