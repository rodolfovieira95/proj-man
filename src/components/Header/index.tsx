import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import UserMenu from "../UserMenu";

const Header = () => {
  return (
    <header className="flex justify-between px-8 py-4 border-b border-accent mb-8">
      <Link href="/">
        <h1>ProjMan</h1>
      </Link>

      <div className="flex gap-4">
        <UserMenu />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
