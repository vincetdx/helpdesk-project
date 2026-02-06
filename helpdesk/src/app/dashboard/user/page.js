import { verifySession } from '@/lib/session';
import prisma from '@/lib/db'; 
import Link from 'next/link';

export default async function UserDashboard() {
  const session = await verifySession();

  // query al db
  const tickets = await prisma.ticket.findMany({
    where: { 
      authorId: session.userId 
    },
    orderBy: {
      createdAt: 'desc' 
    }
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ciao, {session?.name}! 👋</h1>
        <p className="text-gray-600">Benvenuto nella tua dashboard</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* colonna 1 - Azioni */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold mb-2">Hai un problema?</h2>
          <p className="text-gray-500 mb-4 text-sm">Apri un nuovo ticket e ti risponderemo presto.</p>
          <Link 
            href="/dashboard/user/new" 
            className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-medium"
          >
            + Nuovo Ticket
          </Link>
        </div>

        {/* colonna 2/3 - Lista Ticket */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">I tuoi Ticket recenti</h2>

          {tickets.length === 0 && (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded border border-dashed">
              Non hai ancora aperto nessun ticket.
            </div>
          )}

          {/* map dei ticket */}
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{ticket.title}</h3>
                
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                  ${ticket.status === 'APERTO' ? 'bg-yellow-100 text-yellow-800' : 
                    ticket.status === 'CHIUSO' ? 'bg-gray-100 text-gray-600' : 
                    'bg-green-100 text-green-800'}`
                }>
                  {ticket.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {ticket.description}
              </p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
                <span>Priorità: <strong className="text-gray-700">{ticket.priority}</strong></span>
                <span>{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}