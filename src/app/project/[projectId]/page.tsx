import { getColumns } from "@/actions/columns";
import { getProjectInfo } from "@/actions/projects";
import KanbanBoard from "@/components/KanbanBoard";
import NewCardForm from "@/components/NewCardForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  const data = await getProjectInfo(projectId);
  const columns = await getColumns(projectId);

  return (
    <main>
      <section className="px-8 flex justify-between w-full">
        <h1 className=" font-bold text-xl">{data?.name}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create New Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crie um novo card</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <NewCardForm columnId={data?.columns[0]?.id || ""} />
          </DialogContent>
        </Dialog>
      </section>
      <KanbanBoard initialColumns={columns} />
    </main>
  );
};

export default ProjectPage;
