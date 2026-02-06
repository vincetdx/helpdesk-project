'use client';

import { useFormState } from 'react-dom';
import { loginAction } from '@/actions/auth-actions';

export default function LoginPage() {
  const [state, action] = useFormState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cat-base text-cat-text">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border-2 border-cat-surface">
        <h1 className="text-3xl font-extrabold text-center text-cat-lavender mb-2">
          Helpdesk <span className="text-cat-blue"></span>
        </h1>
        <p className="text-center text-cat-subtext mb-8">Accedi al portale di supporto</p>

        <form action={action} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-cat-text mb-1">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="es. mario@test.com"
              className="w-full rounded-lg border border-cat-overlay/30 bg-cat-base p-3 text-cat-text placeholder-cat-overlay focus:border-cat-lavender focus:ring-2 focus:ring-cat-lavender/50 outline-none transition" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-cat-text mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="******"
              className="w-full rounded-lg border border-cat-overlay/30 bg-cat-base p-3 text-cat-text placeholder-cat-overlay focus:border-cat-lavender focus:ring-2 focus:ring-cat-lavender/50 outline-none transition" 
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-cat-red/10 border border-cat-red/20 rounded-lg text-cat-red text-sm text-center font-bold">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-cat-lavender text-white font-bold py-3 rounded-lg hover:bg-cat-blue transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Entra
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-cat-surface text-xs text-cat-overlay text-center">
          <p>Credenziali Demo:</p>
          <p>User: ernesto@test.com | Operatore: fidel@test.com</p>
          <p>Pass: password123</p>
        </div>
      </div>
    </div>
  );
}