"use server";

import { prisma } from "@/lib/prisma";

export async function deleteCard(cardId: string) {
  return prisma.card.delete({
    where: { id: cardId },
  });
}

export async function createCard(
  data: {
    title: string;
    description: string;
  },
  columnId: string
) {
  const project = await prisma.card.create({
    data: {
      title: data.title,
      columnId,
      description: data.description,
    },
  });
  return project;
}
