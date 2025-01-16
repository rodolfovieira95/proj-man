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
import { createProject } from "@/actions/projects";
import { useSession } from "next-auth/react";
import { DialogClose } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ProjectFormData {
  title: string;
  description: string;
}

const NewProjectForm = () => {
  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      await createProject(data, session.user.id);
      toast({
        title: "Sucesso!",
        description: "Projeto criado com sucesso!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Houve um erro ao criar o projeto.",
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
              <FormLabel>Título do Projeto:</FormLabel>
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
              <FormLabel>Descrição do projeto:</FormLabel>
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
        <div className="flex justify-between mt-8">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Enviar</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
export default NewProjectForm;
