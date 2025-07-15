"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/passwords', label: 'Passwords' },
    { href: '/cards', label: 'Cards' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Wallet</h1>
        <div className="flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                pathname === link.href ? 'border-b-2 border-blue-600 dark:border-blue-400' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}