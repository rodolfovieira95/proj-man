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
import DeleteProjectDialog from "../DeleteProjectDialog";
import { updateProjectInfo } from "@/actions/projects";
import { useToast } from "@/hooks/use-toast";

const ProjectMgmtForm = ({ projectId }: { projectId: string }) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: { name: string; description: string }) => {
    try {
      await updateProjectInfo({
        id: projectId,
        title: data.name,
        description: data.description,
      });
      toast({
        title: "Sucesso!",
        description: "Projeto alterado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      toast({
        title: "Erro!",
        description: "Erro ao alterar dados do projeto!",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Projeto</FormLabel>
              <FormControl>
                <Input placeholder="Titulo do projeto" {...field} />
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
              <FormLabel>Descrição do Projeto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this card"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Enviar</Button>
        </div>
        <DeleteProjectDialog projectId={projectId} />
      </form>
    </Form>
  );
};
export default ProjectMgmtForm;
