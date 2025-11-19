import LoginForm from "@/components/auth/Login";
import Navigation from "@/components/base/NavBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function LoginPage() {

  const session = await auth.api.getSession({
      headers:await headers(),
  })
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation session={session} />
      <LoginForm />
    </main>
  )
}
