import { logoutAction } from '@/actions/auth';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-xl text-blue-600">Helpdesk</span>
        
        <form action={logoutAction}>
          <button 
            type="submit" 
            className="text-sm text-gray-600 hover:text-red-600 font-medium"
          >
            Esci
          </button>
        </form>
      </nav>

      {/* User/Admin */}
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
