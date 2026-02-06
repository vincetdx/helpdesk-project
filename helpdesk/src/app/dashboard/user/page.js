import { verifySession } from '@/lib/session';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function UserDashboard() {
  const session = await verifySession();

  const tickets = await prisma.ticket.findMany({
    where: { authorId: session.userId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-cat-base min-h-screen p-6 font-sans text-cat-text">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-cat-lavender mb-2">Ciao, {session?.name}! 👋</h1>
        <p className="text-cat-subtext font-medium text-lg">Ecco i tuoi ticket.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        
        {/* colonna azione */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-cat-surface h-fit sticky top-6">
          <div className="w-12 h-12 bg-cat-rosewater/20 rounded-full flex items-center justify-center text-2xl mb-4">
            🚀
          </div>
          <h2 className="text-xl font-bold mb-2 text-cat-text">Serve aiuto?</h2>
          <p className="text-cat-overlay mb-6 text-sm leading-relaxed">
            Apri un ticket e ti risponderemo il prima possibile.
          </p>
          <Link 
            href="/dashboard/user/new" 
            className="block text-center bg-cat-blue text-white py-3 rounded-xl hover:bg-cat-lavender transition font-bold shadow-md transform hover:-translate-y-0.5"
          >
            + Nuovo Ticket
          </Link>
        </div>

        {/* lista ticket */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-cat-text mb-4">I tuoi Ticket</h2>

          {tickets.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-cat-overlay/30 text-cat-overlay font-medium">
              Nessun ticket. Tutto funziona a meraviglia! ✨
            </div>
          )}

          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-2xl shadow-sm border border-cat-surface hover:shadow-md transition duration-300">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-cat-text">{ticket.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                  ${ticket.status === 'APERTO' ? 'bg-cat-peach/10 text-cat-peach' : 'bg-cat-green/10 text-cat-green'}`
                }>
                  {ticket.status}
                </span>
              </div>
              
              <p className="text-cat-subtext mb-5 leading-relaxed">
                {ticket.description}
              </p>
              
              {/* risposta operatore */}
              {ticket.status === 'CHIUSO' && (
                <div className="mb-5 bg-cat-green/5 border-l-4 border-cat-green p-4 rounded-r-lg">
                  <p className="text-xs font-bold text-cat-green uppercase mb-1">Risposta dell'operatore:</p>
                  <p className="text-cat-text italic">"{ticket.resolution}"</p>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-cat-overlay border-t border-cat-surface pt-4">
                <span className="flex items-center gap-1">
                  Priorità: <strong className="text-cat-text uppercase">{ticket.priority}</strong>
                </span>
                <span>{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}