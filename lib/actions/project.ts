"use server"

import { zipToFileNode } from "@/hooks/extract";
import  prisma from "../prisma"

export async function createProject(userId: string, name: string, zipData: Buffer, description?: string) {
  const project = await prisma.project.create({
    data: {
      userId,
      name,
      zipData: new Uint8Array(zipData),
      description
    }
  });
  return project;
}


export async function getProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  if (!project) {
    throw new Error("Project not found");
  }
  const fileNode = await zipToFileNode(project.zipData);
  
  return {
    ...project,
    fileNode
  };
}


export async function getUserProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: { createdAt: "desc" }
  });
  return projects;
}


export async function deleteProject(projectId: string , userId: string) {
  let project = await prisma.project.findUnique({ where: { id: projectId } });
  if (project?.userId !== userId) throw new Error("Not authorized");

    project = await prisma.project.delete({
    where: { id: projectId }
  });
  return project;
}


