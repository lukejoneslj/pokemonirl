import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default async function CharityReflectTrainerPage() {
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
  
  // Fetch challenge progress for the charity reflect trainer (challenge ID 7)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 7)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const reflectionQuestions = [
    {
      id: 1,
      question: "Who is someone you struggle to show charity toward and why?",
      prompt: "Consider a person in your life who is difficult to love or understand. What makes it challenging to show them charity? What assumptions might you be making about them?"
    },
    {
      id: 2,
      question: "When have you felt truly understood by someone who disagreed with you?",
      prompt: "Describe a time when someone listened to understand you, not just to respond. How did it feel? What did they do that made you feel understood?"
    },
    {
      id: 3,
      question: "What barriers prevent you from listening to understand rather than to respond?",
      prompt: "Reflect on your communication habits. Do you formulate responses while others are talking? Do you interrupt? What emotions arise when you hear views that contradict yours?"
    },
    {
      id: 4,
      question: "How might your life change if you chose to be a peacemaker in every interaction?",
      prompt: "Imagine approaching every conversation, even difficult ones, as a peacemaker. How would your relationships, work, and community involvement change?"
    },
    {
      id: 5,
      question: "What specific contentious behaviors do you need to abandon?",
      prompt: "President Nelson asked us to examine our discipleship through how we treat others. What specific behaviors (criticism, defensiveness, contempt, etc.) do you need to replace with more charitable actions?"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader user={profile} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/badges/2">
              Back to Charity Badge
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-xl">
              ✍️
            </div>
            <h1 className="text-2xl font-bold">Misty: Sister Grace</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              Misty guides trainers to look within. Known for her fiery personality but also her deep capacity for empathy, 
              she helps you discover truths about yourself you might have overlooked. Your challenge is to 
              reflect honestly on difficult questions about charity and understanding in your own life.
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
              <p className="italic text-purple-800">
                "Is your love conditional?"
              </p>
            </div>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-6">
                <h3 className="text-lg font-medium mb-2">Reflection Instructions</h3>
                <p className="mb-4">
                  Take time to deeply consider each question below. You may want to journal your responses 
                  privately in a notebook, or simply reflect internally. The goal is honest self-examination 
                  that leads to greater charity and understanding in your relationships.
                </p>
                <p className="text-sm italic">
                  "True disciples of Jesus Christ are peacemakers." — President Russell M. Nelson
                </p>
              </div>
              
              <div className="space-y-8">
                {reflectionQuestions.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200">
                      <h4 className="font-semibold text-lg">{item.question}</h4>
                    </div>
                    <div className="p-4">
                      <p className="mb-4 text-slate-600">{item.prompt}</p>
                      <Textarea 
                        placeholder="Reflect on this question..." 
                        className="min-h-[100px]"
                        disabled={isCompleted}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-medium mb-2">Going Deeper</h3>
                <p>
                  Consider how your answers to these questions might inform how you interact with others 
                  this week. What one change could you make to become more of a peacemaker in your daily interactions?
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button variant={isCompleted ? "outline" : "default"} asChild>
                  <Link href="/badges/2">
                    {isCompleted ? 'Return to Badge' : 'Mark as Complete on Badge Page'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 