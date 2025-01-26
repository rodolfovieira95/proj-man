"use server";

import { prisma } from "@/lib/prisma";
import { ProjectMember, User } from "@prisma/client";

export async function getUserProjects(userId: string) {
  return prisma.project.findMany({
    where: { OR: [{ members: { some: { userId } } }, { ownerId: userId }] },
    include: { owner: true },
  });
}

export async function getProjectInfo(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      columns: {
        include: {
          cards: true,
        },
      },
    },
  });
}

export async function deleteProject(projectId: string) {
  return prisma.project.delete({
    where: { id: projectId },
  });
}

export async function createProject(
  data: {
    title: string;
    description: string;
  },
  userId: string
) {
  const project = await prisma.project.create({
    data: {
      name: data.title,
      description: data.description,
      ownerId: userId,
    },
  });
  const predefinedColumns = ["To Do", "In Progress", "Done"];
  const columnsArray = predefinedColumns.map((name) => ({
    name,
    projectId: project.id,
  }));

  await prisma.column.createMany({
    data: columnsArray,
  });

  return project;
}

export async function createBoard(columns: string[], projectId: string) {
  const columnsArray = columns.map((item) => ({ name: item, projectId }));
  try {
    await prisma.column.createMany({
      data: columnsArray,
    });
  } catch (error) {
    console.error("houve um erro: ", error);
  }

  return;
}

export type ProjectUsers = (ProjectMember & { user: User })[];

export async function getProjectUsers(
  projectId: string
): Promise<ProjectUsers> {
  try {
    const projectMembers = await prisma.projectMember.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        user: true,
      },
    });

    return projectMembers.length > 0 ? projectMembers : [];
  } catch (error) {
    console.error("houve um erro: ", error);
  }

  return [];
}

export async function updateProjectInfo(projectInfo: {
  id: string;
  title?: string;
  description?: string;
}) {
  return prisma.project.update({
    where: { id: projectInfo.id },
    data: {
      name: projectInfo.title,
      description: projectInfo.description,
    },
  });
}
