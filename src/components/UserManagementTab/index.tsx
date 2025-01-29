"use client";

import React, { useEffect, useState } from "react";

import { getProjectUsers, ProjectUsers } from "@/actions/projects";
import { Role } from "@prisma/client";
import UserTable from "./UserTable";
import UserFilter from "./UserFilter";

export default function UserManagement({ projectId }: { projectId: string }) {
  const [projectUsers, setProjectUsers] = useState<ProjectUsers>([]);
  const [search, setSearch] = useState("");
  const [filterPermission, setFilterPermission] = useState<Role | "ALL">("ALL");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getProjectUsers(projectId);
      setProjectUsers(data);
    };
    getUsers();
  }, [projectId]);

  const filteredUsers = projectUsers?.filter((projectUser) => {
    if (!projectUser.user.name) return [];

    return (
      projectUser.user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterPermission === "ALL" || projectUser.role === filterPermission)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>

      <UserFilter
        projectId={projectId}
        search={search}
        setSearch={setSearch}
        filterPermission={filterPermission}
        setFilterPermission={setFilterPermission}
      />

      <UserTable
        filteredUsers={filteredUsers}
        projectId={projectId}
        setProjectUsers={setProjectUsers}
      />

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}
