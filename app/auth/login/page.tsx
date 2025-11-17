import LoginForm from "@/components/auth/Login";
import Navigation from "@/components/base/NavBar";


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <LoginForm />
    </main>
  )
}
