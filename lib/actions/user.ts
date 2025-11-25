"use server"

import { Polar } from "@polar-sh/sdk";
import  prisma from "../prisma";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
});

export async function syncPolarCustomerId(userId: string) {
  try {
    const polarCustomer = await polarClient.customers.getExternal({externalId: userId});

    if (polarCustomer && polarCustomer.id) {
      await prisma.user.update({
        where: { id: userId },
        data: { polarCustomerId: polarCustomer.id },
      });
    } else {
      console.log(`Polar customer not found`);
    }
  } catch (error) {
    console.error("Error syncing Polar customer:", error);
  }
}
