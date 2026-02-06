import { verifySession } from '@/lib/session';

export default async function UserDashboard() {
  const session = await verifySession();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ciao, {session?.name}! 👋</h1>
        <p className="text-gray-600">Benvenuto nella tua Dashboard</p>
      </header>

      {/* Card */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Hai un problema?</h2>
          <p className="text-gray-500 mb-4 text-sm">Apri un nuovo ticket e ti risponderemo presto.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            + Nuovo Ticket
          </button>
        </div>

        {/* TODO - lista ticket */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">I tuoi Ticket recenti</h2>
          <div className="text-center py-8 text-gray-400 bg-gray-50 rounded border border-dashed">
            Nessun ticket presente
          </div>
        </div>
      </div>
    </div>
  );
}
