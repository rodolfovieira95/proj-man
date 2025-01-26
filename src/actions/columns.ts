import { prisma } from "@/lib/prisma";

export async function getColumns(projectId: string) {
  const columns = await prisma.column.findMany({
    where: {
      projectId,
    },
    include: {
      cards: true,
    },
  });

  return columns;
}
