import { polarClient } from "@polar-sh/better-auth"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? 
        window.location.origin : 
        (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    plugins: [polarClient()]
})
export const {signIn,signUp,signOut,updateUser ,changeEmail , changePassword ,useSession} = createAuthClient()