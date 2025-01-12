"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import CardForm from "@/components/CardForm";

type Project = {
  id: string;
  name: string;
  description: string;
};

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    description: "Description of Project Alpha",
  },
  { id: "2", name: "Project Beta", description: "Description of Project Beta" },
  {
    id: "3",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "4",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "5",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "6",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "7",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "8",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "9",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "10",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
  {
    id: "11",
    name: "Project Gamma",
    description: "Description of Project Gamma",
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-4 ">
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
            <CardForm />
          </DialogContent>
        </Dialog>
      </section>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          type="text"
          placeholder="Search for projects..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3"
        />
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {mockProjects.length} projects
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
                <Button className="mt-2 w-full">
                  <Link href={`/project/${project.id}`}>Project Page</Link>
                </Button>
                <Button variant="outline" className="mt-2 w-full">
                  <Link href={`/manage/project/${project.id}`}>
                    Manage Project
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
