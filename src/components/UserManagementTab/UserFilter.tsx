"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewUserModal from "./NewUserModal";
import { $Enums } from "@prisma/client";

type UserFilterProps = {
  projectId: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filterPermission: "ALL" | $Enums.Role;
  setFilterPermission: React.Dispatch<
    React.SetStateAction<"ALL" | $Enums.Role>
  >;
};

const UserFilter = ({
  projectId,
  search,
  setSearch,
  filterPermission,
  setFilterPermission,
}: UserFilterProps) => {
  return (
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
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="EDITOR">Editor</SelectItem>
          <SelectItem value="VIEWER">Viewer</SelectItem>
        </SelectContent>
      </Select>

      <NewUserModal projectId={projectId} />
    </div>
  );
};

export default UserFilter;
