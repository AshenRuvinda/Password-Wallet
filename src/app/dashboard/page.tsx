import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your account details with ease and security.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Passwords Card */}
          <Link
            href="/passwords"
            className="group relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.405 1.376 1 1.723v2.277h2v-2.277c.595-.347 1-.985 1-1.723zm-7 4v2h14v-2c0-2.761-2.239-5-5-5h-4c-2.761 0-5 2.239-5 5z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Passwords
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Securely manage your login credentials.
                </p>
              </div>
            </div>
          </Link>

          {/* Cards Card */}
          <Link
            href="/cards"
            className="group relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cards
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Organize your credit card information.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}