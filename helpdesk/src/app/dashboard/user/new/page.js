'use client';

import { useFormState } from 'react-dom';
import { createTicketAction } from '@/actions/ticket';
import Link from 'next/link'; // tasto annulla

export default function NewTicketPage() {
  const [state, action] = useFormState(createTicketAction, null);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Apri un nuovo Ticket</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <form action={action} className="space-y-6">
          
          {/* Titolo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Oggetto del problema</label>
            <input 
              name="title" 
              type="text" 
              required
              placeholder="Es. Il PC non si accende"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Priorità */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priorità</label>
            <select 
              name="priority" 
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="BASSA">Bassa (Non urgente)</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta (Bloccante)</option>
            </select>
          </div>

          {/* Descrizione */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione dettagliata</label>
            <textarea 
              name="description" 
              required
              rows="5"
              placeholder="Descrivi cosa è successo..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Errore */}
          {state?.error && (
            <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">
              ⚠️ {state.error}
            </div>
          )}

          {/* Bottoni */}
          <div className="flex gap-4 pt-2">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              Invia Ticket
            </button>
            
            <Link 
              href="/dashboard/user" 
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 font-medium"
            >
              Annulla
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
