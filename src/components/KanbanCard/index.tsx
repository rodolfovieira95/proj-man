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
          } ${snapshot.isDragging ? "w-auto h-auto" : "w-full h-[150px]"}`}
          onClick={() => onClick(card)}
        >
          <Card className="h-full w-full overflow-hidden">
            <CardHeader className="truncate">
              <CardTitle className="truncate">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="truncate">{card.description}</CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
