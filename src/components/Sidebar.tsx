import Link from 'next/link';
import { HomeIcon, KeyIcon, CreditCardIcon, CogIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link href="/passwords" className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <KeyIcon className="h-5 w-5 mr-2" /> Passwords
          </Link>
        </li>
        <li>
          <Link href="/cards" className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <CreditCardIcon className="h-5 w-5 mr-2" /> Cards
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <CogIcon className="h-5 w-5 mr-2" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
