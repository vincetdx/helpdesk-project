'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Compila tutti i campi.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Credenziali non valide.' };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return { error: 'Credenziali non valide.' };
    }

    await createSession({ userId: user.id, role: user.role, name: user.name });

  } catch (error) {
    return { error: 'Errore del server.' };
  }

  // TO-DO: far smistare dal middleware
  redirect('/dashboard');
}

export async function logoutAction() {
  await deleteSession();
  redirect('/');
}
