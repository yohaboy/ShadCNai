import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Layout from "./Layout-client"

export default async function DashboardLayout(){

  const session = await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
    redirect("/auth/login")
  }
  return <Layout session={session}/>
}