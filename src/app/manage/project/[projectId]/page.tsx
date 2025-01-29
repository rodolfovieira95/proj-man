import { getProjectInfo } from "@/actions/projects";
import ColumnLayoutEditor from "@/components/ColumnLayoutEditor";
import ProjectMgmtForm from "@/components/ProjectMgmtForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/UserManagementTab";
import { Prisma } from "@prisma/client";

type ProjectWithColumns = Prisma.ProjectGetPayload<{
  include: { columns: true };
}>;

const ManageProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  const projectInfo = (await getProjectInfo(projectId)) as ProjectWithColumns;

  return (
    <div className="px-8 min-h-dvh mt-8">
      <h1 className="mb-8">Manage Project: {projectInfo?.name}</h1>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Project Info</TabsTrigger>
          <TabsTrigger value="users">Project Users</TabsTrigger>
          <TabsTrigger value="layout">Project Layout</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <ProjectMgmtForm projectId={projectId} />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement projectId={projectId} />
        </TabsContent>
        <TabsContent value="layout">
          <ColumnLayoutEditor projectId={projectId} projectInfo={projectInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjectPage;
