'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';

interface AuthError {
  message: string;
}

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  // Initialize Supabase client
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      
      if (isSignUp) {
        // Handle sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Since email confirmation is disabled, user should be signed in automatically
        if (data.user) {
          router.push('/dashboard');
          router.refresh();
        }
      } else {
        // Handle sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Redirect to dashboard on successful login
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: unknown) {
      const authError = err as AuthError;
      setError(authError.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={isLoading}
          required
        />
      </div>
      
      <Button 
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          isSignUp ? 'Sign Up' : 'Sign In'
        )}
      </Button>
      
      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </form>
  );
} 