"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createCard } from "@/actions/cards";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormData {
  title: string;
  description: string;
}

const NewCardForm = ({ columnId }: { columnId: string }) => {
  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      await createCard(data, columnId);
      toast({ title: "Sucesso!", description: "Projeto criado com sucesso!" });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao criar o projeto!",
        variant: "destructive",
      });
      console.error("Erro ao criar projeto:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do card:</FormLabel>
              <FormControl>
                <Input placeholder="Project title" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do card:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline">Cancelar</Button>
        <Button type="submit">Criar</Button>
      </form>
    </Form>
  );
};
export default NewCardForm;
