'use client';

import { TrendingUp, Users, FolderOpen, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="2,543"
          description="+12% from last month"
          icon={<Users className="w-5 h-5" />}
          trend="up"
        />
        <StatCard
          title="Active Projects"
          value="18"
          description="+2 this week"
          icon={<FolderOpen className="w-5 h-5" />}
          trend="up"
        />
        <StatCard
          title="Revenue"
          value="$45,231"
          description="+8% from last month"
          icon={<DollarSign className="w-5 h-5" />}
          trend="up"
        />
        <StatCard
          title="Growth"
          value="24.5%"
          description="+4.3% from last quarter"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest Projects</CardTitle>
            <CardDescription>Your recently active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Dashboard Redesign', status: 'In Progress', progress: 65 },
                { name: 'Mobile App Launch', status: 'Planning', progress: 30 },
                { name: 'API Integration', status: 'Completed', progress: 100 },
              ].map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{project.name}</span>
                    <span className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground">
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Summary</CardTitle>
            <CardDescription>Current plan details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg">
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-2xl font-bold text-foreground">Pro</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Next billing</span>
                <span className="font-medium">Dec 15, 2024</span>
              </div>
              <Button className="w-full">Manage Billing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <p className={`text-xs mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {description}
            </p>
          </div>
          <div className="p-3 bg-accent rounded-lg text-primary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
