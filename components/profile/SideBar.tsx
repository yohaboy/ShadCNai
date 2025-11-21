'use client';

import { LayoutDashboard, User, FolderOpen, CreditCard, Settings, LogOut } from 'lucide-react';
import { PageType } from './Layout-client';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const navItems: { label: string; icon: React.ReactNode; page: PageType }[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, page: 'overview' },
  { label: 'Profile', icon: <User className="w-5 h-5" />, page: 'profile' },
  { label: 'Projects', icon: <FolderOpen className="w-5 h-5" />, page: 'projects' },
  { label: 'Billing', icon: <CreditCard className="w-5 h-5" />, page: 'billing' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, page: 'settings' },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onPageChange(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentPage === item.page
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
