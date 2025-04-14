import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://frpyqzeeovumcmipdcaf.supabase.co';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycHlxemVlb3Z1bWNtaXBkY2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTQ4NDAsImV4cCI6MjA2MDIzMDg0MH0.TJyo1S8xKZNTyp04-qA9aQ_KMX6iV3jRPap8IKP3gvo';

// Create a single supabase client for client-side interactions
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'pokemonirl-auth'
  }
}); 