import {betterAuth} from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "./generated/prisma/client"
import { nextCookies } from "better-auth/next-js"

const prisma = new PrismaClient()

export const auth = betterAuth({
    database:prismaAdapter(prisma,{provider:"postgresql"}),
    emailAndPassword:{
        enabled:true,
    },
    user: {
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true
        },
        additionalFields: {
          tokens: {
            type: 'number',     
            required: false,      
            defaultValue: 10, 
            input: true
          }
        }
    },
    plugins:[nextCookies()]
})