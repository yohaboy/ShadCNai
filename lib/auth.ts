import {betterAuth} from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "./generated/prisma/client"
import { nextCookies } from "better-auth/next-js"
import { Polar } from "@polar-sh/sdk";
import { polar, checkout } from "@polar-sh/better-auth";

const prisma = new PrismaClient()

const polarClient = new Polar({
    accessToken: process.env.POLAR_SANDBOX_ACCESS_TOKEN,
    server: "sandbox"
});

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
          },
        polarCustomerId: {
            type: "string",
            required: false,
            input: false 
          }
        }
    },
    plugins:[
      polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: process.env.NEXT_PUBLIC_PRODUCT_ONE_SANDBOX!,
                            slug: "Token"
                        },
                        {
                            productId: process.env.NEXT_PUBLIC_PRODUCT_TWO_SANDBOX!,
                            slug: "Token"
                        },
                        {
                            productId: process.env.NEXT_PUBLIC_PRODUCT_THREE_SANDBOX!,
                            slug: "Token"
                        }
                    ],
                    successUrl: process.env.POLAR_SANDBOX_SUCCESS_URL,
                    authenticatedUsersOnly: true
                })
            ],
        }),
      nextCookies()
    ]
})