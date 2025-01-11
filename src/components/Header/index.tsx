import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";

const Header = () => {
  return (
    <header className="flex justify-between px-8 py-4 border-b border-accent mb-8">
      <Link href="/">
        <h1>ProjMan</h1>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
