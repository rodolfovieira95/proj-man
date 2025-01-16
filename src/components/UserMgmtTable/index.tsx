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
import { getProjectUsers, ProjectUsers } from "@/actions/projects";
import { Role } from "@prisma/client";

export default function UserManagement({ projectId }: { projectId: string }) {
  const [projectUsers, setProjectUsers] = useState<ProjectUsers>([]);
  const [search, setSearch] = useState("");
  const [filterPermission, setFilterPermission] = useState<"All" | Role>("All");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getProjectUsers(projectId);
      setProjectUsers(data);
    };
    getUsers();
  }, []);

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
      (filterPermission === "All" || projectUser.role === filterPermission)
    );
  });

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
            <SelectItem value="All">Todos</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
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
