"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      
      <div className="flex-1 flex flex-col">
        {!isAuthPage && <Navbar />}
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}