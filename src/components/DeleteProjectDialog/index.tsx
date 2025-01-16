"use client";

import { redirect } from "next/navigation";
import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteProjectDialog = ({ projectId }: { projectId: string }) => {
  const handleDeleteButton = async () => {
    try {
      await deleteProject(projectId);
    } catch (error) {
      console.error(error);
    }
    redirect("/dashboard");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar o projeto?</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogClose asChild>
          <Button>Cancelar</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleDeleteButton}>
          Deletar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectDialog;
