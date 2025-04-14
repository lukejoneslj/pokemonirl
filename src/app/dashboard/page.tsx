import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import BadgeMap from '@/components/badges/BadgeMap';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function DashboardPage() {
  // Server-side check if user is authenticated
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  // If not authenticated, redirect to auth page
  if (!session) {
    redirect('/auth');
  }
  
  // Fetch user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  // Fetch user badge progress
  const { data: badgeProgress } = await supabase
    .from('badge_progress')
    .select('*')
    .eq('user_id', session.user.id);
  
  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader user={profile} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Badge Journey</h1>
          <p className="text-slate-600">
            Complete challenges to earn badges and transform your life
          </p>
        </div>
        
        <BadgeMap 
          badgeProgress={badgeProgress || []} 
          userId={session.user.id} 
        />
      </main>
    </div>
  );
} 