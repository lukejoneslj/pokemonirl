import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    
    if (code) {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      });
      
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error || !data.session) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(new URL('/auth', request.url));
      }
      
      // Check if user profile exists and create if it doesn't
      const userId = data.session.user.id;
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (!existingProfile) {
        // Create a new profile for the user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: userId,
              email: data.session.user.email,
              display_name: data.session.user.email?.split('@')[0],
              avatar_url: null,
              created_at: new Date().toISOString()
            }
          ]);
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }
      
      // Redirect to dashboard on successful authentication
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Return to auth page if code is not available
    return NextResponse.redirect(new URL('/auth', request.url));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/auth?error=callback_error', request.url));
  }
} 