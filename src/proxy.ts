import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from './lib/jwt-decode';

const publicRoutes = ['/', '/products', '/search', '/about'];
const authRoutes = ['/auth/login', '/auth/register'];

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('access-token')?.value;
  const { nextUrl } = request;
  const userSession = getPayload(token ?? '');
  const path = request.nextUrl.pathname;

  if (publicRoutes.includes(path) || path.startsWith('/products/')) {
    return NextResponse.next();
  }
  if (!userSession && path === '/auth/register') return NextResponse.next();
  if (!userSession && path === '/auth/login') return NextResponse.next();

  if (userSession?.role !== 'ADMIN' && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (
    !userSession &&
    !authRoutes.includes(path) &&
    !publicRoutes.includes(path)
  ) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${path}`, nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico)).*)',
  ],
};
