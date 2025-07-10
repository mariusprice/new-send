
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigurationPage() {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [vercelToken, setVercelToken] = useState('');
  
  const [supabaseTestResult, setSupabaseTestResult] = useState('');
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseSuccess, setSupabaseSuccess] = useState(false);

  const [vercelTestResult, setVercelTestResult] = useState('');
  const [isTestingVercel, setIsTestingVercel] = useState(false);
  const [vercelSuccess, setVercelSuccess] = useState(false);

  const router = useRouter();

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult('');
    setSupabaseSuccess(false);

    try {
      const response = await fetch('/api/test-supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supabaseUrl, supabaseKey }),
      });
      const data = await response.json();
      if (response.ok) {
        setSupabaseTestResult(data.message);
        setSupabaseSuccess(true);
      } else {
        setSupabaseTestResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setSupabaseTestResult('An unexpected error occurred.');
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleTestVercel = async () => {
    setIsTestingVercel(true);
    setVercelTestResult('');
    setVercelSuccess(false);

    try {
      const response = await fetch('/api/test-vercel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vercelToken }),
      });
      const data = await response.json();
      if (response.ok) {
        setVercelTestResult(data.message);
        setVercelSuccess(true);
      } else {
        setVercelTestResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setVercelTestResult('An unexpected error occurred.');
    } finally {
      setIsTestingVercel(false);
    }
  };

  const handleContinue = () => {
    router.push('/dashboard/setup/ses');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Initial Configuration</h1>
        <p className="text-sm text-center text-gray-600">
          First, let's set up your Supabase and Vercel connections.
        </p>
        <div className="space-y-6">
          <div className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold text-gray-800">Supabase</h2>
            <div>
              <label htmlFor="supabaseUrl" className="block text-sm font-medium text-gray-700">
                Supabase Project URL
              </label>
              <input
                id="supabaseUrl"
                name="supabaseUrl"
                type="text"
                placeholder="https://<your-project-ref>.supabase.co"
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="supabaseKey" className="block text-sm font-medium text-gray-700">
                Supabase Service Role Key
              </label>
              <input
                id="supabaseKey"
                name="supabaseKey"
                type="password"
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={isTestingSupabase}
                className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                {isTestingSupabase ? 'Testing...' : 'Test Supabase'}
              </button>
            </div>
            {supabaseTestResult && (
              <p className={`mt-2 text-sm ${supabaseSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {supabaseTestResult}
              </p>
            )}
          </div>

          <div className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold text-gray-800">Vercel</h2>
            <div>
              <label htmlFor="vercelToken" className="block text-sm font-medium text-gray-700">
                Vercel API Token
              </label>
              <input
                id="vercelToken"
                name="vercelToken"
                type="password"
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={vercelToken}
                onChange={(e) => setVercelToken(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleTestVercel}
                disabled={isTestingVercel}
                className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                {isTestingVercel ? 'Testing...' : 'Test Vercel'}
              </button>
            </div>
            {vercelTestResult && (
              <p className={`mt-2 text-sm ${vercelSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {vercelTestResult}
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!supabaseSuccess || !vercelSuccess}
              className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Save and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 