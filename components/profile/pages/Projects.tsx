'use client';

import { Plus, Archive, MoreHorizontal, Trash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { deleteProject, getProject, getUserProjects } from '@/lib/actions/project';
import { auth } from '@/lib/auth';

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type Session = typeof auth.$Infer.Session;

export default function Projects({ session }:{session:Session | null}) {
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        const result = await getUserProjects(session?.user.id || "");
        if (mounted && result) {
          setProjectList(result);
        }
      } catch (error) {
        console.error('Failed to load projects', error);
      }
    }

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
      <div className='flex justify-center w-full px-4 py-6'>
        <div className="w-full max-w-7xl space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-muted-foreground mt-1">Manage and track your active projects</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectList.map((project) => (
              <ProjectCard session={session} key={project.id} project={project} />
            ))}
          </div>

          {projectList.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <Archive className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-4">Create your first project to get started</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
  );
}

function ProjectCard({ project, session }: { project: Project; session: Session | null }) {

  const handleProjectDelete = async (projectId: string) => {
    await deleteProject(projectId, session?.user.id || "");
    localStorage.removeItem("projectFiles");
  }

  const handleProjectSelection = async(projectId :string) => {
    const FetchedProject = await getProject(projectId)
    console.log("Fetched : ",FetchedProject);
  }

  const statusColor = {
    Active: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <Card onClick={() => handleProjectSelection(project.id)} className="hover:shadow-lg transition-shadow hover:cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="mt-2">{project.description}</CardDescription>
          </div>
          <Button onClick={() => handleProjectDelete(project.id)} variant="ghost" size="icon">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
      </CardContent>
    </Card>
  );
}
