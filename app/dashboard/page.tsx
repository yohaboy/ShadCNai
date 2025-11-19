import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardPage from "./client"


export default async function Dashboard(){

  const session = await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
    redirect("/auth/login")
  }
  return <DashboardPage session={session}/>
}