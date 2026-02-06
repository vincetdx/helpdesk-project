'use client';

import { useFormState } from 'react-dom'; 
import { loginAction } from '@/actions/auth';

export default function LoginPage() {
  const [state, action] = useFormState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Helpdesk Accesso
        </h1>

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="mario@test.com"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="******"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm text-center">{state.error}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Entra
          </button>
        </form>

        <div className="mt-6 bg-gray-50 p-4 rounded text-xs text-gray-600">
          <p><strong>Dati Demo:</strong></p>
          <p>User: ernesto@test.com / password123</p>
          <p>Operatore: fidel@test.com / password123</p>
        </div>
      </div>
    </div>
  );
}
