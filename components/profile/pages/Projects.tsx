'use client';

import { Plus, Archive, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'On Hold' | 'Completed';
  members: number;
  progress: number;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Dashboard Redesign',
    description: 'Complete redesign of the main dashboard interface',
    status: 'Active',
    members: 5,
    progress: 65,
  },
  {
    id: '2',
    name: 'Mobile App Launch',
    description: 'Native mobile applications for iOS and Android',
    status: 'Active',
    members: 8,
    progress: 45,
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Third-party API integrations and webhooks',
    status: 'Completed',
    members: 3,
    progress: 100,
  },
  {
    id: '4',
    name: 'Performance Optimization',
    description: 'Database and frontend performance improvements',
    status: 'On Hold',
    members: 2,
    progress: 30,
  },
];

export default function Projects() {
  return (
      <div className='flex justify-center w-full px-4 py-6'>
        <div className="w-full max-w-7xl space-y-6">
          {/* Header with Create Button */}
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
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State for New Projects */}
          {projects.length === 0 && (
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

function ProjectCard({ project }: { project: Project }) {
  const statusColor = {
    Active: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="mt-2">{project.description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[project.status]}`}>
            {project.status}
          </span>
          <span className="text-sm text-muted-foreground">{project.members} members</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
