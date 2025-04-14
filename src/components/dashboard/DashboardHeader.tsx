'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
}

interface DashboardHeaderProps {
  user: User | null;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const displayName = user?.full_name || user?.username || user?.email?.split('@')[0] || 'Trainer';
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="font-bold text-xl text-blue-600">
          PokemonIRL
        </Link>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 hidden sm:inline-block">
            Welcome, {displayName}
          </span>
          
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.avatar_url || ''} alt={displayName} />
              <AvatarFallback>{getInitials(user?.full_name)}</AvatarFallback>
            </Avatar>
            
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 