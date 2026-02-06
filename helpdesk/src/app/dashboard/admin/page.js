import { verifySession } from '@/lib/session';
import prisma from '@/lib/db';
import { closeTicketAction } from '@/actions/ticket'; 

export default async function AdminDashboard() {
  const session = await verifySession();

  // query ticket + info autore
  const tickets = await prisma.ticket.findMany({
    include: {
      author: {
        select: { name: true, email: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pannello Operatore 🛠️</h1>
          <p className="text-gray-600">Bentornato, {session?.name}. Ecco il lavoro da fare.</p>
        </div>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
          Admin Mode
        </span>
      </header>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Tutti i Ticket ({tickets.length})</h2>
        </div>

        {tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nessun ticket presente nel sistema.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-gray-50 transition flex flex-col md:flex-row justify-between md:items-center gap-4">
                
                {/* dati ticket*/}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border
                      ${ticket.priority === 'ALTA' ? 'bg-red-50 text-red-700 border-red-100' : 
                        ticket.priority === 'MEDIA' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                        'bg-blue-50 text-blue-700 border-blue-100'}`
                    }>
                      {ticket.priority}
                    </span>
                    <h3 className="font-bold text-gray-800">{ticket.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                  
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>👤 <strong>{ticket.author.name}</strong> ({ticket.author.email})</span>
                    <span>•</span>
                    <span>📅 {new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
                  </div>
                </div>

                {/* Colonna stato / azioni */}
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold
                    ${ticket.status === 'APERTO' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-200 text-gray-600'}`
                  }>
                    {ticket.status}
                  </span>
                  
                  {/* bottone chiudi ticker */}
                  {ticket.status === 'APERTO' && (
                    <form action={closeTicketAction}>
                      <input type="hidden" name="ticketId" value={ticket.id} />
                      <button 
                        type="submit"
                        className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-black transition shadow-sm"
                      >
                        Chiudi Ticket
                      </button>
                    </form>
                  )}
                  
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}