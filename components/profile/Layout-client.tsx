'use client';

import { useState } from 'react';
import Overview from './pages/Overview';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Navigation from '../base/NavBar';
import Sidebar from './SideBar';
import { auth } from '@/lib/auth';

export type PageType = 'overview' | 'profile' | 'projects' | 'billing' | 'settings';
type Session = typeof auth.$Infer.Session;

export default async function Layout({ session }:{session:Session | null}) {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'profile':
        return <Profile />;
      case 'projects':
        return <Projects />;
      case 'billing':
        return <Billing />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={`bg-background dark`}>
      <Navigation session={session}/>
      <div className='flex h-screen'>
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8">
            {renderPage()}
            </div>
        </main>
      </div>
      </div>

    </div>
  );
}
