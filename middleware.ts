import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateRequest } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = ['/dashboard/login', '/dashboard/register'];
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Get user from session
  const user = await validateRequest(request);
  
  // Redirect if trying to access auth pages while logged in
  if (isPublicPath && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect to login if trying to access protected pages while logged out
  if (!isPublicPath && !user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/dashboard/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
};