import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card as CardType } from ".prisma/client";

interface KanbanCardProps {
  card: CardType;
  index: number;
  onClick: (card: CardType) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, index, onClick }) => {
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`transition-transform duration-200 ${
            snapshot.isDragging ? "shadow-lg bg-blue-50" : ""
          }`}
          style={provided.draggableProps.style}
          onClick={() => onClick(card)}
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
  );
};

export default KanbanCard;
