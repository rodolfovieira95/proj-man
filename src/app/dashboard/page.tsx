import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import NewProjectForm from "@/components/NewProjectForm";
import DashboardSearch from "@/components/DashboardSearch";
import { auth } from "@/auth";
import { getUserProjects } from "@/actions/projects";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Você precisa estar logado para acessar o dashboard.</p>
      </div>
    );
  }

  const projects = await getUserProjects(session?.user?.id || "");

  return (
    <div className="container mx-auto p-4 space-y-4 min-h-dvh">
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crie um novo card</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <NewProjectForm />
          </DialogContent>
        </Dialog>
      </section>

      <DashboardSearch projects={projects} />
    </div>
  );
}
