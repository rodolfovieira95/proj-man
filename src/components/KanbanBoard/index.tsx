"use client";

import React, { useState } from "react";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { updateCardOrder } from "@/actions/cards";
import { Card as CardType } from ".prisma/client";
import KanbanColumn from "../KanbanColumn";
import CardDialog from "../CardDialog";

export default function KanbanBoard({
  initialColumns,
}: {
  initialColumns:
    | ({
        cards: CardType[];
      } & {
        name: string;
        id: string;
        projectId: string;
      })[]
    | undefined;
}) {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (data: CardType) => {
    console.log("Dados salvos:", data);
    setSelectedCard(null);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {columns?.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-64">
              <KanbanColumn column={column} onCardClick={handleCardClick} />
            </div>
          ))}
        </div>
      </DragDropContext>

      {selectedCard && (
        <CardDialog
          card={selectedCard}
          isEditing={isEditing}
          onClose={() => setSelectedCard(null)}
          onEdit={handleEditClick}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
