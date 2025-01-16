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

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      await createProject(data, session.user.id);
      alert("Projeto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      alert("Erro ao criar projeto.");
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

        <Button variant="outline">Cancelar</Button>
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
};
export default NewProjectForm;
