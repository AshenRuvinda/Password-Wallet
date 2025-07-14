import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/passwords" className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700">
          <h2 className="text-xl">Passwords</h2>
          <p>Manage your saved login credentials.</p>
        </Link>
        <Link href="/cards" className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700">
          <h2 className="text-xl">Cards</h2>
          <p>Manage your credit card information.</p>
        </Link>
      </div>
    </div>
  );
}
