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
      order: 0,
    },
  });
  return project;
}

export async function updateCardOrder(columnId: string, cardIds: string[]) {
  const updatePromises = cardIds.map((cardId, index) =>
    prisma.card.update({
      where: { id: cardId },
      data: { order: index, columnId },
    })
  );
  await Promise.all(updatePromises);
}
