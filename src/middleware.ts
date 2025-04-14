import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured for middleware
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  
  // Refresh session if expired
  await supabase.auth.getSession();
  
  // Get the pathname of the request
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth', '/auth/callback'];
  if (publicRoutes.includes(pathname)) {
    return res;
  }

  // Check if the user is authenticated
  const { data: { session } } = await supabase.auth.getSession();
  
  // If there is no session and the route requires authentication, redirect to login
  if (!session && !publicRoutes.includes(pathname)) {
    const url = new URL('/auth', request.url);
    return NextResponse.redirect(url);
  }
  
  return res;
}

// Specify the routes that should be checked by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 