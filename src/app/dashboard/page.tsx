
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Dashboard</h1>
        <div className="p-6 border-2 border-dashed rounded-lg border-gray-300">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">Welcome to your Dashboard!</h2>
            <p className="mt-1 text-sm text-gray-500">
              To start sending emails, you need to configure your Amazon SES settings.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/setup/ses"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Configure Amazon SES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
