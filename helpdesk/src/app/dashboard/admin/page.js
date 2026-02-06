import { verifySession } from '@/lib/session';

export default async function AdminDashboard() {
  const session = await verifySession();

  return (
    <div>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pannello Operatore 🛠️</h1>
          <p className="text-gray-600">Bentornato al lavoro, {session?.name}.</p>
        </div>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          Admin Mode
        </span>
      </header>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Coda di Lavoro</h2>
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded border border-dashed">
          Nessun ticket da gestire.
        </div>
      </div>
    </div>
  );
}
