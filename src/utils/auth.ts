'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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