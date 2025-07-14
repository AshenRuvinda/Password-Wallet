import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Wallet</h1>
        <div className="flex space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/passwords">Passwords</Link>
          <Link href="/cards">Cards</Link>
          <Link href="/settings">Settings</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}