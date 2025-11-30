import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {  headers } from "next/headers";
import { Polar } from "@polar-sh/sdk";
import prisma from "@/lib/prisma";

const polar = new Polar({
  accessToken: process.env.POLAR_SANDBOX_ACCESS_TOKEN,
  server: "sandbox",
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin; 
  const checkoutId = url.searchParams.get("checkout_id");

  const session = await auth.api.getSession({
      headers:await headers(),
  })

if (!session?.user) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  if (!checkoutId) {
    return NextResponse.redirect(`${origin}/profile?error=missing_checkout_id`);
  }


  const checkout = await polar.checkouts.get({ id: checkoutId });

  if (checkout.customerId !== session.user.polarCustomerId) {
    return NextResponse.redirect(`${origin}/profile?error=customer_mismatch`);
  }

  if (!["confirmed", "succeeded"].includes(checkout.status)) {
    return NextResponse.redirect(`${origin}/profile?error=not_confirmed`);
  }

  const tokens = Number(checkout.metadata?.tokens ?? 0);

  const alreadyProcessed = await prisma.processedCheckout.findUnique({
    where: { checkoutId: checkout.id },
  });

  if (!alreadyProcessed && tokens > 0) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { tokens: { increment: tokens } },
    });

    await prisma.processedCheckout.create({
      data: {
        checkoutId: checkout.id,
        userId: session.user.id,
        tokens,
      },
    });
  }
  
  return NextResponse.redirect(`${origin}/profile?success=true`)
}
