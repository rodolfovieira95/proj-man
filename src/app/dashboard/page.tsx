import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Você não está autenticado.</div>;
  }

  return <div>Bem-vindo, {session.user?.email}!</div>;
}
