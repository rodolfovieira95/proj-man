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

const ProjectMgmtForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título do Projeto</FormLabel>
            <FormControl>
              <Input placeholder="Card Title" {...field} />
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

      <Button variant="outline">Cancelar</Button>
      <Button type="submit">Enviar</Button>
    </Form>
  );
};
export default ProjectMgmtForm;
