"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBoard } from "@/actions/projects";
import { Prisma } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

const predefinedLayouts = {
  KANBAN: ["To Do", "In Progress", "Done"],
  SCRUM: ["Backlog", "Sprint", "Testing", "Completed"],
};

type ProjectWithColumns = Prisma.ProjectGetPayload<{
  include: { columns: true };
}>;

export default function ColumnLayoutEditor({
  projectId,
  projectInfo,
}: {
  projectId: string;
  projectInfo: ProjectWithColumns;
}) {
  const initialColumns = projectInfo.columns.map((column) => column.name);
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [customName, setCustomName] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const reorderedColumns = [...columns];
    const [movedItem] = reorderedColumns.splice(source.index, 1);
    reorderedColumns.splice(destination.index, 0, movedItem);

    setColumns(reorderedColumns);
  };

  const addColumn = () => {
    if (!customName.trim()) return;
    setColumns((prev) => [...prev, customName.trim()]);
    setCustomName("");
  };

  const removeColumn = (index: number) => {
    setColumns((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePredefinedLayout = (layout: keyof typeof predefinedLayouts) => {
    setCustomMode(false);
    setColumns(predefinedLayouts[layout]);
  };

  const enableCustomMode = () => {
    setCustomMode(true);
    setColumns([]);
  };

  const actualLayout = () => {
    setCustomMode(false);
    setColumns(initialColumns);
  };

  const handleCreateBoard = async () => {
    try {
      await createBoard(columns, projectId);
      toast({ title: "Sucesso", description: "Board alterado com sucesso!" });
    } catch {
      toast({ title: "Error!", description: "Erro ao criar board!" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organização das colunas</h1>
        <div className="flex gap-2">
          {Object.keys(predefinedLayouts).map((layout) => (
            <Button
              key={layout}
              variant="outline"
              onClick={() =>
                handlePredefinedLayout(layout as keyof typeof predefinedLayouts)
              }
            >
              {layout}
            </Button>
          ))}
          <Button variant="outline" onClick={actualLayout}>
            Layout Atual
          </Button>
          <Button variant="outline" onClick={enableCustomMode}>
            Custom Layout
          </Button>
        </div>
      </div>

      {customMode && (
        <div className="flex gap-2">
          <Input
            placeholder="Column name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          <Button onClick={addColumn}>Add Column</Button>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4"
            >
              {columns.map((column, index) => (
                <Draggable key={column} draggableId={column} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="p-4 bg-accent border rounded-lg shadow-md flex flex-col items-center"
                    >
                      <span>{column}</span>
                      {customMode && (
                        <Button
                          variant="destructive"
                          className="mt-2"
                          onClick={() => removeColumn(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleCreateBoard}>Atualizar Board</Button>
    </div>
  );
}
