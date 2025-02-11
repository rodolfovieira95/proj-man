import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Card as CardType } from ".prisma/client";

interface CardDialogProps {
  card: CardType | null;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: (data: CardType) => void;
}

const CardDialog: React.FC<CardDialogProps> = ({
  card,
  isEditing,
  onClose,
  onEdit,
  onSave,
}) => {
  const { register, handleSubmit, reset } = useForm<CardType>();

  React.useEffect(() => {
    if (card) reset(card);
  }, [card, reset]);

  return (
    <Dialog open={!!card} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Card</DialogTitle>
        </DialogHeader>
        {!isEditing ? (
          <div>
            <p>
              <strong>Título:</strong> {card?.title}
            </p>
            <p>
              <strong>Descrição:</strong> {card?.description}
            </p>
            <button onClick={onEdit}>Editar</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSave)}>
            <div>
              <label>Título</label>
              <input {...register("title")} />
            </div>
            <div>
              <label>Descrição</label>
              <textarea {...register("description")} />
            </div>
            <button type="submit">Salvar</button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
