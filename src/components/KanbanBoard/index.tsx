"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateCardOrder } from "@/actions/cards";
import { Card as CardType } from ".prisma/client";

export default function KanbanBoard({
  initialColumns,
}: {
  initialColumns:
    | ({
        cards: {
          id: string;
          description: string | null;
          title: string;
          columnId: string;
        }[];
      } & {
        name: string;
        id: string;
        projectId: string;
      })[]
    | undefined;
}) {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragEnd: OnDragEndResponder = async (result) => {
    const { source, destination } = result;

    if (!destination) return; // Se o item não foi solto em uma área válida, não faz nada

    // Se o índice e a coluna de origem forem os mesmos, reordene os itens
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Encontre a coluna de origem
    const sourceColumn = columns?.find((col) => col.id === source.droppableId);
    const destinationColumn = columns?.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    // Atualize o estado para reordenar ou mover cards
    const sourceCards = Array.from(sourceColumn.cards) as CardType[];
    const [removedCard] = sourceCards.splice(source.index, 1);

    if (sourceColumn.id === destinationColumn.id) {
      // Reordenação dentro da mesma coluna
      sourceCards.splice(destination.index, 0, removedCard);
      setColumns((prevColumns) =>
        prevColumns?.map((col) =>
          col.id === sourceColumn.id ? { ...col, cards: sourceCards } : col
        )
      );
      await updateCardOrder(
        sourceColumn.id,
        sourceCards.map((card) => card.id)
      );
    } else {
      // Mover entre colunas
      const destinationCards = Array.from(
        destinationColumn.cards
      ) as CardType[];
      destinationCards.splice(destination.index, 0, removedCard);

      setColumns((prevColumns) =>
        prevColumns?.map((col) => {
          if (col.id === sourceColumn.id) {
            return { ...col, cards: sourceCards };
          }
          if (col.id === destinationColumn.id) {
            return { ...col, cards: destinationCards };
          }
          return col;
        })
      );
      await updateCardOrder(
        sourceColumn.id,
        sourceCards.map((card) => card.id)
      );
      await updateCardOrder(
        destinationColumn.id,
        destinationCards.map((card) => card.id)
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {columns?.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg shadow space-y-4 transition-colors duration-200 flex-shrink-0 w-[300px] ${
                    snapshot.isDraggingOver ? "bg-blue-100" : "bg-muted"
                  }`}
                >
                  <h2 className="text-lg font-semibold">{column.name}</h2>
                  {column.cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-transform duration-200 ${
                            snapshot.isDragging ? "shadow-lg bg-blue-50" : ""
                          }`}
                          style={provided.draggableProps.style}
                        >
                          <Card>
                            <CardHeader>
                              <CardTitle>{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{card.description}</CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
