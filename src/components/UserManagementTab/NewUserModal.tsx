"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { addUserToProject } from "@/actions/projects";
import { Input } from "../ui/input";

type NewUserModalProps = { projectId: string };

const NewUserModal = ({ projectId }: NewUserModalProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      email: "",
      role: "" as Role,
    },
  });

  const onSubmit: SubmitHandler<{ email: string; role: Role }> = async (
    data
  ) => {
    if (!data.email || !data.role) {
      toast({
        title: "Erro!",
        description: "Preencha todos os campos!",
        variant: "destructive",
      });
      return;
    }
    try {
      await addUserToProject(projectId, data.email, data.role);
      toast({
        title: "Sucesso",
        description: "Usuário adicionado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      toast({
        title: "Erro!",
        description: "Erro ao adicionar usuário!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo usuário</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input placeholder="email@email.com" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do card:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full md:w-1/4">
                        <SelectValue placeholder="Selecione a permissão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="VIEWER">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
