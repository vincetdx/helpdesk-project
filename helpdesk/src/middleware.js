import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request) {
  // decrypt cookie
  const session = await verifySession();
  
  const isLoginPage = request.nextUrl.pathname === '/';
  const isDashboardRoot = request.nextUrl.pathname === '/dashboard';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if ((isDashboardRoot || isLoginPage) && session) {

    if (session.role === 'OPERATOR') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }
  }

  return NextResponse.next();
}
