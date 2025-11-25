'use client';

import { useState } from 'react';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Navigation from '../base/NavBar';
import Sidebar from './SideBar';
import { auth } from '@/lib/auth';

export type PageType = 'profile' | 'projects' | 'billing' | 'settings';
type Session = typeof auth.$Infer.Session;

export default function Layout({ session }:{session:Session | null}) {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');
  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile session={session}/>;
      case 'projects':
        return <Projects session={session} />;
      case 'billing':
        return <Billing session={session}/>;
      case 'settings':
        return <Settings session={session}/>;
      default:
        return <Profile session={session}/>;
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
