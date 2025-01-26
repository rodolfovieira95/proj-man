"use client";

import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const MenuContent = () => {
  const { push } = useRouter();
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => push("/profile")}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => signOut({ redirect: true, redirectTo: "/" })}
      >
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default MenuContent;
