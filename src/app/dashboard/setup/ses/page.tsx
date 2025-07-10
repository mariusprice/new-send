
"use client";

import { useState } from 'react';

export default function SESSetupPage() {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [email, setEmail] = useState('');
  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConfiguration = async () => {
    setIsTesting(true);
    setTestResult('');

    try {
      const response = await fetch('/api/ses/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessKeyId, secretAccessKey, region, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResult(data.message);
      } else {
        setTestResult(`Error: ${data.error}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setTestResult('An unexpected error occurred.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Amazon SES Configuration</h1>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="accessKeyId" className="block text-sm font-medium text-gray-700">
              AWS Access Key ID
            </label>
            <input
              id="accessKeyId"
              name="accessKeyId"
              type="text"
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="secretAccessKey" className="block text-sm font-medium text-gray-700">
              AWS Secret Access Key
            </label>
            <input
              id="secretAccessKey"
              name="secretAccessKey"
              type="password"
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              AWS Region
            </label>
            <select
              id="region"
              name="region"
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-east-2">US East (Ohio)</option>
              <option value="us-west-1">US West (N. California)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">Europe (Ireland)</option>
              <option value="eu-west-2">Europe (London)</option>
              <option value="eu-west-3">Europe (Paris)</option>
              <option value="eu-central-1">Europe (Frankfurt)</option>
              <option value="eu-north-1">Europe (Stockholm)</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
              <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
              <option value="sa-east-1">South America (São Paulo)</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Test Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {testResult && (
            <p
              className={`text-sm ${
                testResult.startsWith('Error:') ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {testResult}
            </p>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleTestConfiguration}
              disabled={isTesting}
              className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isTesting ? 'Testing...' : 'Test Configuration'}
            </button>
            <button
              type="submit"
              className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 