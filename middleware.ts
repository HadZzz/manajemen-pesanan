import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateRequest } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Get user from session
  const user = await validateRequest(request);
  
  // Debug: Log current path and authentication status
  console.log('Current path:', request.nextUrl.pathname);
  console.log('Authentication status:', !!user);

  // Public routes that don't need authentication
  const publicPaths = ['/dashboard/login', '/dashboard/register'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // If path starts with /dashboard and user is not authenticated
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user && !isPublicPath) {
    // Redirect to login
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  // If user is authenticated and trying to access login/register
  if (user && isPublicPath) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Update matcher to only handle dashboard routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/dashboard/:path*'
  ],
};