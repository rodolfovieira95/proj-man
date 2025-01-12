"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardData = {
  id: string;
  title: string;
  description: string;
};

type ColumnData = {
  id: string;
  name: string;
  cards: CardData[];
};

const initialColumns: ColumnData[] = [
  {
    id: "todo",
    name: "To Do",
    cards: [
      { id: "1", title: "Card 1", description: "Task details for card 1" },
      { id: "2", title: "Card 2", description: "Task details for card 2" },
    ],
  },
  {
    id: "inProgress",
    name: "In Progress",
    cards: [
      { id: "3", title: "Card 3", description: "Task details for card 3" },
    ],
  },
  {
    id: "done",
    name: "Done",
    cards: [],
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);

  const handleDragEnd = (result: any) => {
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
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destinationColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    // Atualize o estado para reordenar ou mover cards
    const sourceCards = Array.from(sourceColumn.cards);
    const [removedCard] = sourceCards.splice(source.index, 1);

    if (sourceColumn.id === destinationColumn.id) {
      // Reordenação dentro da mesma coluna
      sourceCards.splice(destination.index, 0, removedCard);
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === sourceColumn.id ? { ...col, cards: sourceCards } : col
        )
      );
    } else {
      // Mover entre colunas
      const destinationCards = Array.from(destinationColumn.cards);
      destinationCards.splice(destination.index, 0, removedCard);

      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === sourceColumn.id) {
            return { ...col, cards: sourceCards };
          }
          if (col.id === destinationColumn.id) {
            return { ...col, cards: destinationCards };
          }
          return col;
        })
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Projetos</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg shadow space-y-4 transition-colors duration-200 ${
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
