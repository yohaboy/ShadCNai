import type { Metadata } from "next"
import "./globals.css"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "AI Project Builder",
}

export default function Home() {
  return <ClientPage />
}
