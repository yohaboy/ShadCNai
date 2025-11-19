import Navigation from "@/components/base/NavBar";
import Footer from "@/components/Hero/Footer";
import AboutUs from "@/components/others/About";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function About() {
    const session = await auth.api.getSession({
        headers:await headers(),
    })
    return (
        <>
          <Navigation session={session}/>
          <AboutUs/>
          <Footer/>
        </>
    )
}