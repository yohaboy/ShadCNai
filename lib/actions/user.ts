"use server"

import { Polar } from "@polar-sh/sdk";
import  prisma from "../prisma";
import { authClient } from "../auth-client";

const polarClient = new Polar({
  accessToken: process.env.POLAR_SANDBOX_ACCESS_TOKEN!,
});

const orgClient = new Polar({
  accessToken: process.env.POLAR_SANDBOX_ACCESS_TOKEN!,
  server: "sandbox",
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


export async function getCustomerTransactions(polarCustomerId: string) {
  const res = await orgClient.orders.list({
    customerId: polarCustomerId,
    page: 1,
    limit: 50,
  });

  const importantOrders = res.result.items.map(order => ({
    createdAt: order.createdAt.toISOString(),
    totalAmount: order.totalAmount,
    status: order.status,
    invoiceNumber: order.invoiceNumber,
  }));

  return importantOrders;
}



