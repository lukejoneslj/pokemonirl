import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default async function CharityApplyTrainerPage() {
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
  
  // Fetch challenge progress for the charity apply trainer (challenge ID 9)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 9)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const challengeCards = [
    {
      id: 1,
      title: "One Day of Zero Criticism",
      duration: "1 Day",
      description: "For one full day, commit to zero criticism or contentious speech with anyone. Replace judgment with curiosity by asking questions rather than making assumptions.",
      steps: [
        "Plan your day in advance, identifying potential trigger situations",
        "Each time you feel like criticizing, pause and ask a question instead",
        "Replace 'That's wrong' with 'Help me understand your thinking'",
        "When you feel defensive, take a deep breath and respond with 'That's an interesting perspective'",
        "At the end of the day, reflect on what you learned about yourself and others"
      ]
    },
    {
      id: 2,
      title: "Finding Common Ground",
      duration: "2 Days",
      description: "For two days, reach out to someone with different beliefs or perspectives from yours. Your goal is to find three things you sincerely admire about them and identify common values you share.",
      steps: [
        "Day 1: Identify someone whose views differ significantly from yours",
        "Arrange a conversation (in person, phone, or video chat)",
        "Prepare 3-5 open-ended questions that allow them to share what matters to them",
        "During your conversation, actively listen for values you share",
        "Day 2: Write down three specific things you admire about this person",
        "Reach out to sincerely express your appreciation for these qualities"
      ]
    },
    {
      id: 3,
      title: "Secret Service Challenge",
      duration: "3 Days",
      description: "For three days, perform one anonymous act of service each day for someone who would never expect it from you—ideally someone you find difficult to love or understand.",
      steps: [
        "Day 1: Serve someone in your immediate circle (family/roommate)",
        "Day 2: Serve someone in your community (neighbor/coworker)",
        "Day 3: Serve someone you find difficult or who holds different views",
        "Keep each act completely anonymous if possible",
        "Focus on meeting actual needs, not just symbolic gestures",
        "Journal about how this secret service affects your feelings toward others"
      ]
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
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-xl">
              🚀
            </div>
            <h1 className="text-2xl font-bold">Lt. Surge: Captain Heart</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              Lt. Surge is a trainer who pushes you to take action. Known for his electric personality and 
              dedication to service, he understands that true mastery comes from applying what you've learned 
              in real-life situations. Your challenge is to complete these 1-3 day challenges that put 
              charitable principles into practice.
            </p>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-6">
              <p className="italic text-orange-800">
                "Service is love in uniform."
              </p>
            </div>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 mb-6">
                <h3 className="text-lg font-medium mb-2">Your Mission</h3>
                <p className="mb-2">
                  Complete each of the three challenges below. These challenges will take you beyond 
                  theoretical understanding and reflection into real-world application of charity and peacemaking.
                  Each challenge builds on the skills you've been developing.
                </p>
                <p className="text-sm italic">
                  "One of the easiest ways to identify a true follower of Jesus Christ is how compassionately 
                  that person treats other people—especially when we have differences of opinion." 
                  — President Russell M. Nelson
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-1">
                {challengeCards.map((card) => (
                  <Card key={card.id} className={isCompleted ? "opacity-70" : ""}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{card.title}</CardTitle>
                        <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{card.duration}</span>
                        </div>
                      </div>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-semibold mb-2 text-slate-700">Challenge Steps:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                        {card.steps.map((step, index) => (
                          <li key={`step-${card.id}-${index}`}>{step}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                <h3 className="text-lg font-medium mb-2">Tracking Your Progress</h3>
                <p className="mb-4">
                  Consider keeping a journal of your experiences with these challenges. What did you learn? 
                  How did these experiences change your perspective? What was most difficult, and why?
                </p>
                <p>
                  When you've completed all three challenges, return to the badge page to mark this 
                  trainer as complete.
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