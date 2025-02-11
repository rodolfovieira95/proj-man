import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "../KanbanCard";
import { Card as CardType } from ".prisma/client";

interface KanbanColumnProps {
  column: {
    id: string;
    name: string;
    cards: CardType[];
  };
  onCardClick: (card: CardType) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, onCardClick }) => {
  return (
    <Droppable key={column.id} droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`p-4 rounded-lg shadow space-y-4 transition-colors duration-200 flex-shrink-0 flex-grow flex-basis-0 ${
            snapshot.isDraggingOver ? "bg-blue-100" : "bg-muted"
          }`}
        >
          <h2 className="text-lg font-semibold">{column.name}</h2>
          {column.cards.map((card, index) => (
            <KanbanCard
              key={card.id}
              card={card}
              index={index}
              onClick={onCardClick}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
