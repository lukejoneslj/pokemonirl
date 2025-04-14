'use server';

import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createServerClient as createSSRClient } from '@supabase/ssr';
import { supabaseUrl, supabaseAnonKey } from './supabase';
import { CookieOptions } from '@supabase/ssr';

// Create a server component client (for use in Server Components)
export async function createServerClient() {
  return createServerComponentClient({ cookies });
}

// Create a service client with more privileges for backend operations
export async function createServiceClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

// Create a server-side Supabase client
export async function createServerSupabaseClient() {
  // Use the cookieStore
  return createServerComponentClient({ 
    cookies,
  });
}

// Helper to get the current session
export async function getSession() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
} 