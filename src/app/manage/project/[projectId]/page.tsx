import ProjectMgmtForm from "@/components/ProjectMgmtForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/UserMgmtTable";

const ManageProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return (
    <div className="px-8 min-h-dvh">
      <h1 className="mb-8">Manage Project: {projectId}</h1>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Project Info</TabsTrigger>
          <TabsTrigger value="users">Project Users</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <ProjectMgmtForm />
          <Button variant="destructive">Delete Project</Button>
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjectPage;
