import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware refreshes the user's session and must be run
// for any Server Component route that uses a Supabase client.
export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  
  // Create client using middleware client
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs
  await supabase.auth.getSession();
  
  return res;
}

// Ensure middleware runs for relevant routes
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 