"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

const DashboardSearch = ({ projects }: { projects: Project[] }) => {
  const [search, setSearch] = useState("");
  const { push } = useRouter();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          type="text"
          placeholder="Search for projects..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3"
        />
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              <div className="flex gap-4">
                <Button
                  className="mt-2 w-full"
                  onClick={() => push(`/project/${project.id}`)}
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() => push(`/manage/project/${project.id}`)}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
};

export default DashboardSearch;
