import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export default async function CharityStudyTrainerPage() {
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
  
  // Fetch challenge progress for the charity study trainer (challenge ID 6)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 6)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const resources = [
    {
      id: 1,
      title: "Kindness in Difference",
      source: "The Be Kind People Project",
      url: "https://thebekindpeopleproject.org/blog/2024/11/06/kindness-in-difference/",
      description: "Learn about approaching others with empathy and kindness, especially when there are differences in perspective or background."
    },
    {
      id: 2,
      title: "Seek First to Understand, Then to be Understood",
      source: "Digital Enterprise",
      url: "https://digitalenterprise.org/leadership/habit-5-seek-first-to-understand-then-to-be-understood/",
      description: "Explore Stephen Covey's 5th habit about the importance of listening with intent to understand before seeking to be understood."
    },
    {
      id: 3,
      title: "Letter from Birmingham Jail",
      source: "Martin Luther King Jr.",
      url: "https://www.csuchico.edu/iege/_assets/documents/susi-letter-from-birmingham-jail.pdf",
      description: "Study Dr. King's powerful letter on justice, compassion, and the moral responsibility to stand against injustice."
    },
    {
      id: 4,
      title: "Peacemakers Needed",
      source: "President Russell M. Nelson",
      url: "https://www.churchofjesuschrist.org/study/general-conference/2023/04/47nelson?lang=eng",
      description: "Learn about becoming a peacemaker in a contentious world through charity, understanding, and Christ-like love."
    }
  ];

  const concepts = [
    {
      id: 1,
      title: "The Pure Love of Christ",
      description: "Explore what it means to have charity—the pure love of Christ—and how it relates to how we treat others, especially those we disagree with."
    },
    {
      id: 2,
      title: "Empathetic Listening",
      description: "Learn the difference between listening to respond versus listening to understand, and how this transforms relationships."
    },
    {
      id: 3,
      title: "The Power of Peacemaking",
      description: "Understand how being a peacemaker can change not only your relationships but also the world around you."
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
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xl">
              📚
            </div>
            <h1 className="text-2xl font-bold">Nurse Joy: Brother Hands</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              Nurse Joy is a master of compassion and understanding, known for her kindness to all people and Pokémon alike.
              She believes that true charity begins with understanding others. Your challenge is to 
              learn the principles of charity and understanding through the provided resources.
            </p>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
              <p className="italic text-red-800">
                "Love without action is just a feeling."
              </p>
            </div>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <span className="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded text-sm">1</span>
                  Study Materials
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {resources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-red-50 p-4">
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
                  <span className="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded text-sm">2</span>
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
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li>How to approach differences with kindness and understanding</li>
                  <li>The importance of truly listening to others' perspectives</li>
                  <li>The moral courage to stand against injustice with love</li>
                  <li>How to become a peacemaker in your relationships and communities</li>
                  <li>Practical ways to replace contention with charity</li>
                </ul>
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