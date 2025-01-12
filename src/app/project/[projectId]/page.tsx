import KanbanBoard from "@/components/KanbanBoard";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return (
    <>
      <h1>Project Page ID : {projectId}</h1>
      <KanbanBoard />
    </>
  );
};

export default ProjectPage;
