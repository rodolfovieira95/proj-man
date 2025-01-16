import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";

const UserMenu = async () => {
  const session = await auth();
  if (!session?.user)
    return (
      <Button>
        <Link href="/login">Login</Link>
      </Button>
    );

  const getUserInitials = () => {
    const name = session?.user?.name;
    if (!name) return "--";
    const nameArray = name.split(" ");
    if (nameArray.length < 1) return name[0];
    return `${nameArray[0][0]}${nameArray[1][0]}`;
  };
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={session.user.image || ""} alt="User Avatar" />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/signout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
