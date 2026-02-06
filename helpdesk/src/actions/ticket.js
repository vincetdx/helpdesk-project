'use server';

import prisma from '@/lib/db';
import { verifySession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTicketAction(prevState, formData) {
  const session = await verifySession();
  if (!session) return { error: 'Devi essere loggato.' };

  const title = formData.get('title');
  const description = formData.get('description');
  const priority = formData.get('priority');

  if (!title || !description) {
    return { error: 'Compila titolo e descrizione.' };
  }

  try {
    await prisma.ticket.create({
      data: {
        title: title,
        description: description,
        priority: priority || 'BASSA',
        authorId: session.userId,
      },
    });

  } catch (error) {
    console.error(error);
    return { error: 'Errore durante la creazione del ticket.' };
  }

  revalidatePath('/dashboard/user');
  redirect('/dashboard/user');
}

export async function closeTicketAction(formData) {
  'use server';
  
  const ticketId = formData.get('ticketId');
  const resolution = formData.get('resolution'); 

  try {
    await prisma.ticket.update({
      where: { 
        id: parseInt(ticketId) 
      },
      data: { 
        status: 'CHIUSO',
        resolution: resolution || 'Nessuna nota aggiuntiva.'
      }
    });

    revalidatePath('/dashboard/admin');
    revalidatePath('/dashboard/user');

  } catch (error) {
    console.error("Errore chiusura ticket:", error);
  }
}