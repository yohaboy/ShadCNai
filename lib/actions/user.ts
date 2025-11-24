"use server"

import  prisma from "../prisma"

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      tokens: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function updateUserTokens(userId: string, tokens: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { tokens }
  });
  return user;
}

export async function updateUserProfile(userId: string, name?: string, email?: string, password?: string) {
  const data: any = {};
  if (name) data.name = name;
  if (email) data.email = email;
  if (password) data.password = password; // In a real app, hash the password before storing

  const user = await prisma.user.update({
    where: { id: userId },
    data
  });
  return user;
}       