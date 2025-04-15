import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default async function ReflectTrainerPage() {
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
  
  // Fetch challenge progress for the reflect trainer (challenge ID 2)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 2)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const reflectionQuestions = [
    {
      id: 1,
      question: "Describe a moment today where you felt truly present. What did that feel like?",
      prompt: "Think about a specific moment when you were fully engaged and aware of your surroundings. How did your body feel? What were you aware of that you might not normally notice?"
    },
    {
      id: 2,
      question: "What are some common distractions that pull you away from the present moment?",
      prompt: "Consider both external distractions (notifications, noise) and internal ones (worries, planning). Which ones affect you most frequently?"
    },
    {
      id: 3,
      question: "After reading about breathing techniques, try one. What did you notice?",
      prompt: "Did you feel any physical sensations? Was it easy or difficult to maintain focus on your breath? Did your mind wander?"
    },
    {
      id: 4,
      question: "How do you currently experience 'stillness' in your life?",
      prompt: "Do you have any regular practices or moments when you feel particularly calm and centered? How often do these occur?"
    },
    {
      id: 5,
      question: "Reflect on a time when prayer brought you a sense of peace.",
      prompt: "What were the circumstances? What made this prayer experience meaningful?"
    },
    {
      id: 6,
      question: "How can prayer help you to cultivate stillness in your daily life?",
      prompt: "Consider how prayer practices might complement other mindfulness techniques. How might they support each other?"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader user={profile} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/badges/1">
              Back to Stillness Badge
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-xl">
              ✍️
            </div>
            <h1 className="text-2xl font-bold">The Reflect Trainer</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              This trainer guides you to look within. Through thoughtful questions, they help you 
              discover truths about yourself you might have overlooked. Your challenge is to 
              journal and reflect on personal experiences with stillness using the questions below.
            </p>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Reflection Questions</h3>
                <p className="text-slate-600 mb-6">
                  Take time to thoughtfully consider each question below. You can journal your responses 
                  in a notebook or digital document of your choice. The goal is to increase your self-awareness 
                  around stillness practices and experiences.
                </p>
                
                <div className="space-y-6">
                  {reflectionQuestions.map((item, index) => (
                    <Card key={item.id} className="overflow-hidden border-purple-100">
                      <CardContent className="p-0">
                        <div className="bg-purple-50 p-4 border-b border-purple-100">
                          <h4 className="font-semibold flex items-center">
                            <span className="bg-purple-100 text-purple-800 mr-2 px-2.5 py-0.5 rounded text-sm">{index + 1}</span>
                            {item.question}
                          </h4>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-slate-600 mb-4">{item.prompt}</p>
                          <Textarea 
                            placeholder="Your reflection..." 
                            className="min-h-[100px] bg-slate-50"
                            disabled={isCompleted}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-medium mb-2">Journaling Tips</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Set aside at least 15 minutes of uninterrupted time for your reflection.</li>
                  <li>Find a quiet space where you can focus without distractions.</li>
                  <li>Be honest with yourself—there are no "right" or "wrong" answers.</li>
                  <li>Consider the thoughts, emotions, and physical sensations that arise as you reflect.</li>
                  <li>If you're stuck, simply observe your current experience and write about that.</li>
                </ul>
              </div>
              
              <div className="flex justify-end">
                <Button variant={isCompleted ? "outline" : "default"} asChild>
                  <Link href="/badges/1">
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