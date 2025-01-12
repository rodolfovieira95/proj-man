"use client";

import React, { useState } from "react";
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

type User = {
  id: string;
  name: string;
  email: string;
  permission: "Admin" | "Editor" | "Viewer";
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    permission: "Admin",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    permission: "Editor",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "4",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "6",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "7",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "8",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "9",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "10",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "11",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "12",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "13",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "14",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "15",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "16",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "17",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
  {
    id: "18",
    name: "Charlie Brown",
    email: "charlie@example.com",
    permission: "Viewer",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [filterPermission, setFilterPermission] = useState<
    "All" | "Admin" | "Editor" | "Viewer"
  >("All");

  const handlePermissionChange = (
    id: string,
    newPermission: User["permission"]
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, permission: newPermission } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterPermission === "All" || user.permission === filterPermission)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>

      {/* Filtros */}
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.permission}
                  onValueChange={(value) =>
                    handlePermissionChange(user.id, value as User["permission"])
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

      {/* Mensagem caso não encontre usuários */}
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}
