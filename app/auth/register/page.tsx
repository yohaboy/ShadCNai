import RegisterForm from "@/components/auth/Register";
import Navigation from "@/components/base/NavBar";


export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <RegisterForm />
    </main>
  )
}
