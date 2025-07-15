"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/passwords', label: 'Passwords' },
    { href: '/cards', label: 'Cards' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:w-64 z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">Menu</h2>
          <nav className="space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 ${
                  pathname === link.href ? 'bg-blue-100 dark:bg-blue-900/30 font-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}