import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const username = request.cookies.get('username')?.value;

  // Define public paths that don't require authentication
  const publicPaths = ['/', '/login', '/api/auth', '/_next', '/favicon.ico'];

  // Check if the request is to a public path or if the user is authenticated
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path)) || username) {
    return NextResponse.next();
  }

  // Redirect to the login page if the user is not authenticated
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
