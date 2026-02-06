import { verifySession } from '@/lib/session';
import prisma from '@/lib/db';
import { closeTicketAction } from '@/actions/ticket';

export default async function AdminDashboard() {
  const session = await verifySession();

  const tickets = await prisma.ticket.findMany({
    include: { author: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-cat-base min-h-screen p-6 font-sans text-cat-text">
      <header className="mb-8 flex justify-between items-end bg-white p-6 rounded-2xl shadow-sm border border-cat-surface">
        <div>
          <h1 className="text-3xl font-black text-cat-lavender">Pannello Operatore 🛠️</h1>
          <p className="text-cat-subtext font-medium">Ciao {session?.name}, buon lavoro.</p>
        </div>
        <span className="bg-cat-lavender/10 text-cat-lavender px-4 py-1 rounded-full text-sm font-bold border border-cat-lavender/20">
          Modalità operatore
        </span>
      </header>

      <div className="grid gap-6">
        {tickets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-cat-overlay/30 text-cat-overlay font-medium">
            Nessun ticket presente.
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-2xl shadow-sm border border-cat-surface hover:border-cat-lavender/50 transition duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Dati Ticket */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider
                      ${ticket.priority === 'ALTA' ? 'bg-cat-red/10 text-cat-red' : 
                        ticket.priority === 'MEDIA' ? 'bg-cat-peach/10 text-cat-peach' : 
                        'bg-cat-green/10 text-cat-green'}`
                    }>
                      {ticket.priority}
                    </span>
                    <h3 className="text-xl font-bold text-cat-text">{ticket.title}</h3>
                  </div>
                  
                  <p className="text-cat-subtext leading-relaxed bg-cat-base/50 p-4 rounded-xl border border-cat-surface">
                    {ticket.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-cat-overlay font-medium">
                    <div className="w-8 h-8 rounded-full bg-cat-lavender/20 flex items-center justify-center text-cat-lavender font-bold">
                      {ticket.author.name[0]}
                    </div>
                    <span>{ticket.author.name}</span>
                    <span className="text-cat-surface">•</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
                  </div>

                  {ticket.status === 'CHIUSO' && (
                    <div className="mt-4 p-4 bg-cat-green/5 rounded-xl border border-cat-green/20">
                      <p className="text-xs font-bold text-cat-green uppercase mb-1">Risoluzione Admin:</p>
                      <p className="text-cat-text italic">"{ticket.resolution}"</p>
                    </div>
                  )}
                </div>

                {/* Azioni */}
                <div className="md:w-1/3 flex flex-col justify-start">
                  {ticket.status === 'APERTO' ? (
                    <div className="bg-cat-base p-4 rounded-xl border border-cat-surface">
                      <p className="text-sm font-bold text-cat-text mb-2">Chiudi e Rispondi:</p>
                      <form action={closeTicketAction} className="flex flex-col gap-3">
                        <input type="hidden" name="ticketId" value={ticket.id} />
                        
                        <textarea 
                          name="resolution" 
                          required
                          placeholder="Scrivi qui la soluzione o un commento per l'utente..."
                          rows="3"
                          className="w-full text-sm p-3 rounded-lg border border-cat-overlay/30 bg-white focus:ring-2 focus:ring-cat-lavender/50 outline-none resize-none text-cat-text"
                        ></textarea>

                        <button 
                          type="submit"
                          className="w-full bg-cat-text text-white font-bold py-2 rounded-lg hover:bg-cat-lavender transition shadow-md"
                        >
                          Chiudi Ticket
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-cat-base/30 rounded-xl border border-cat-surface">
                      <span className="text-cat-green font-bold flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                        ✅ Ticket Chiuso
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}