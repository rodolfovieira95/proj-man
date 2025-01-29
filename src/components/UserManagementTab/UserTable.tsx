"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectUsers, updateUserPermission } from "@/actions/projects";

import { removeUserFromProject } from "@/actions/projects";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Role } from "@prisma/client";

type UserTableProps = {
  filteredUsers: ProjectUsers;
  setProjectUsers: React.Dispatch<React.SetStateAction<ProjectUsers>>;
  projectId: string;
};

const UserTable = ({
  filteredUsers,
  setProjectUsers,
  projectId,
}: UserTableProps) => {
  const { toast } = useToast();
  const handlePermissionChange = async (
    userId: string,
    newPermission: Role,
    userProjectId: string
  ) => {
    try {
      setProjectUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, permission: newPermission } : user
        )
      );

      await updateUserPermission(projectId, userProjectId, newPermission);
      toast({
        title: "Sucesso!",
        description: "Sucesso ao atualizar permissão do usuários!",
      });
    } catch {
      toast({
        title: "Error!",
        description: "Erro ao atualizar permissão do usuários!",
      });
    }
  };
  return (
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
        {filteredUsers.map(({ user, role, id }) => {
          console.log({ user, role });
          return (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={role}
                  onValueChange={async (value) =>
                    await handlePermissionChange(user.id, value as Role, id)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="EDITOR">Editor</SelectItem>
                    <SelectItem value="VIEWER">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      await removeUserFromProject(projectId, id);
                      toast({
                        title: "Sucesso!",
                        description: "Sucesso ao remover usuário!",
                      });
                    } catch (error) {
                      console.error(error);
                      toast({
                        title: "Erro!",
                        description: "Erro ao remover usuário!",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UserTable;
