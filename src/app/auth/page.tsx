import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';
import { getSession } from '@/utils/auth';

export default async function AuthPage() {
  // Server-side check if user is already authenticated
  const session = await getSession();
  
  // If already authenticated, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Begin Your Journey</CardTitle>
          <CardDescription>
            Sign in or create an account to start your personal growth adventure
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4">
            <AuthForm />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  About
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              PokemonIRL helps you grow through gamified real-life challenges inspired by Pokémon's gym badges. 
              Complete challenges to earn badges and transform your life.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 