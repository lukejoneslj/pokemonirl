import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export default async function StudyTrainerPage() {
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
  
  // Fetch challenge progress for the study trainer (challenge ID 1)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 1)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const resources = [
    {
      id: 1,
      title: "Mindfulness Workbook",
      source: "University of Wisconsin-Madison",
      url: "https://uwm.edu/wellness/wp-content/uploads/sites/657/2023/09/Mindfulness-Workbook.pdf?utm_source=chatgpt.com",
      description: "A comprehensive workbook with mindfulness exercises and practices to develop present moment awareness."
    },
    {
      id: 2,
      title: "How to Pray",
      source: "The Church of Jesus Christ of Latter-day Saints",
      url: "https://www.churchofjesuschrist.org/comeuntochrist/believe/god/how-to-pray",
      description: "Learn the principles of prayer and how it can help establish a connection with God and cultivate inner stillness."
    },
    {
      id: 3,
      title: "Active Listening Techniques",
      source: "Positive Psychology",
      url: "https://positivepsychology.com/active-listening-techniques/?utm_source=chatgpt.com",
      description: "Discover techniques for active listening that help you become more present in conversations."
    }
  ];

  const concepts = [
    {
      id: 1,
      title: "Benefits of Reducing Distractions",
      description: "Learn how minimizing distractions can improve focus, reduce stress, and enhance overall wellbeing."
    },
    {
      id: 2,
      title: "The Beginner's Mind",
      description: "Explore the Zen concept of 'Shoshin' (beginner's mind) - approaching experiences with openness and without preconceptions."
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
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl">
              📚
            </div>
            <h1 className="text-2xl font-bold">The Study Trainer</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              This trainer is a master of knowledge, dedicated to the pursuit of wisdom. 
              They believe that true growth begins with understanding. Your challenge is to 
              learn the principles of stillness and mindfulness through studying the provided resources.
            </p>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded text-sm">1</span>
                  Study Materials
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {resources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-blue-50 p-4">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-slate-500">{resource.source}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-sm mb-4">{resource.description}</p>
                          <Button asChild size="sm" className="w-full">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              Open Resource
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded text-sm">2</span>
                  Key Concepts to Explore
                </h3>
                <div className="space-y-4">
                  {concepts.map((concept) => (
                    <div key={concept.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="font-semibold mb-2">{concept.title}</h4>
                      <p className="text-sm">{concept.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium mb-2">Reflection Prompt</h3>
                <p className="mb-4">
                  After studying these resources, take some time to reflect on what you've learned. 
                  Consider how you might apply these principles in your daily life.
                </p>
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