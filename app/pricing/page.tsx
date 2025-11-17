import Navigation from "@/components/base/NavBar";
import Footer from "@/components/Hero/Footer";
import PricingSection from "@/components/Hero/Pricing";


export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PricingSection />
      <Footer />
    </main>
  )
}
