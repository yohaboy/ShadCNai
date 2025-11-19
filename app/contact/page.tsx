import Navigation from "@/components/base/NavBar";
import Footer from "@/components/Hero/Footer";
import ContactUs from "@/components/others/Contact";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Contact() {
    const session = await auth.api.getSession({
      headers:await headers(),
    })
    return (
        <>
          <Navigation session={session} />
          <ContactUs/>
          <Footer/>
        </>
    )
}