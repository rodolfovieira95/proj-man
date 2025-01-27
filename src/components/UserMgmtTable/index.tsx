"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addUserToProject,
  getProjectUsers,
  ProjectUsers,
} from "@/actions/projects";
import { Role } from "@prisma/client";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function UserManagement({ projectId }: { projectId: string }) {
  const [projectUsers, setProjectUsers] = useState<ProjectUsers>([]);
  const [search, setSearch] = useState("");
  const [filterPermission, setFilterPermission] = useState<Role>("VIEWER");
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      role: "" as Role,
    },
  });

  useEffect(() => {
    const getUsers = async () => {
      const data = await getProjectUsers(projectId);
      setProjectUsers(data);
    };
    getUsers();
  }, [projectId]);

  const handlePermissionChange = (id: string, newPermission: Role) => {
    setProjectUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, permission: newPermission } : user
      )
    );
  };

  const filteredUsers = projectUsers?.filter((projectUser) => {
    if (!projectUser.user.name) return [];

    return (
      projectUser.user.name.toLowerCase().includes(search.toLowerCase()) &&
      projectUser.role === filterPermission
    );
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Input
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />

        <Select
          value={filterPermission}
          onValueChange={(value) =>
            setFilterPermission(value as typeof filterPermission)
          }
        >
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filtrar por permissão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="EDITOR">Editor</SelectItem>
            <SelectItem value="VIEWER">Viewer</SelectItem>
          </SelectContent>
        </Select>

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
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Permissão</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map(({ user, role }) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={role}
                  onValueChange={(value) =>
                    handlePermissionChange(user.id, value as Role)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => console.log("Remover usuário", user.id)}
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}
