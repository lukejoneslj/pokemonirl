import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default async function DeeperPracticeTrainerPage() {
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
  
  // Fetch challenge progress for the deeper practice trainer (challenge ID 4)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 4)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const deeperPractices = [
    {
      id: 1,
      title: "Daily Mindfulness or Prayer",
      duration: "15 minutes per day",
      timeSpan: "2 consecutive days",
      description: "Dedicate 15 minutes each day for two days to mindfulness meditation or prayer.",
      instructions: [
        "Choose a consistent time each day for your practice.",
        "Find a quiet, comfortable space where you won't be disturbed.",
        "You can follow a guided meditation, pray in your own way, or simply sit in silence focusing on your breath.",
        "If your mind wanders (which is normal), gently bring your attention back to your practice.",
        "After each session, take a moment to note how you feel compared to before the practice."
      ],
      tips: [
        "Try to practice at the same time each day to build consistency.",
        "Set a gentle timer so you don't need to check the time.",
        "Start with a few deep breaths to center yourself.",
        "If sitting for 15 minutes is challenging at first, start with 5-10 minutes and work up."
      ]
    },
    {
      id: 2,
      title: "Phone-Free Focus Sessions",
      duration: "4 hours per session",
      timeSpan: "2 separate sessions",
      description: "Complete two 4-hour sessions without using your phone. Schedule these sessions outside of work hours (e.g., in the evening) to focus on mindful activities instead of passive social media consumption.",
      instructions: [
        "Plan when your two 4-hour sessions will take place.",
        "Notify important contacts that you'll be unavailable during these times.",
        "Turn off your phone completely or place it in another room.",
        "Plan mindful activities to fill this time (reading, journaling, creating, having meaningful conversations, etc.).",
        "Notice any urges to check your phone and how those feelings change throughout the session."
      ],
      tips: [
        "Choose activities that engage you fully to reduce the temptation to check your phone.",
        "Have a physical book, journal, or hobby materials ready before starting.",
        "If you live with others, ask them to support your phone-free time by not showing you their phones.",
        "Keep a notepad nearby to jot down things you want to look up later, rather than breaking your phone fast."
      ]
    },
    {
      id: 3,
      title: "Mindful Listening Day",
      duration: "Throughout the day",
      timeSpan: "1 day",
      description: "Practice mindful listening during four separate conversations in one day.",
      instructions: [
        "Choose a day when you'll have multiple opportunities for conversation.",
        "For each of the four conversations, commit to being fully present and practicing active listening.",
        "Give your full attention to the speaker without planning what you'll say next.",
        "Notice non-verbal cues like facial expressions and body language.",
        "Ask follow-up questions to deepen understanding rather than shifting to your own stories.",
        "After each conversation, take a moment to reflect on what you learned and how it felt to listen mindfully."
      ],
      tips: [
        "Put away all devices during these conversations.",
        "Try conversations with different people (colleagues, family, friends, etc.).",
        "If you catch yourself thinking about your response while the other person is still talking, gently redirect your attention back to listening.",
        "Use small verbal and non-verbal cues to show you're engaged, like nodding or saying 'I see'."
      ]
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
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-xl">
              🚀
            </div>
            <h1 className="text-2xl font-bold">The Deeper Practice Trainer</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              This trainer challenges you to take your stillness practice to a deeper level with more 
              significant time commitments. These exercises will help you integrate mindfulness and 
              presence more fully into your daily life and build a foundation for lasting change.
            </p>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the Stillness Master.</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Deeper Practices</h3>
                <p className="text-slate-600 mb-6">
                  Complete at least one of these deeper practice challenges. These require more time and commitment 
                  than the micro-challenges, but they offer an opportunity for more profound experiences with stillness.
                </p>
                
                <div className="space-y-8">
                  {deeperPractices.map((practice) => (
                    <Card key={practice.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-orange-50 p-4 border-b border-orange-100">
                          <h4 className="font-semibold text-lg">{practice.title}</h4>
                          <div className="flex gap-4 mt-2 text-sm text-orange-700">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {practice.duration}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {practice.timeSpan}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          <p>{practice.description}</p>
                          
                          <div>
                            <h5 className="font-medium mb-2">How to Practice:</h5>
                            <ol className="list-decimal pl-5 space-y-1 text-sm">
                              {practice.instructions.map((step, idx) => (
                                <li key={`inst-${practice.id}-${idx}`}>{step}</li>
                              ))}
                            </ol>
                          </div>
                          
                          <div className="bg-slate-50 p-4 rounded-md">
                            <h5 className="font-medium mb-2">Helpful Tips:</h5>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {practice.tips.map((tip, idx) => (
                                <li key={`tip-${practice.id}-${idx}`}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="pt-2">
                            <h5 className="font-medium mb-2 text-sm">Your Progress:</h5>
                            <Progress value={isCompleted ? 100 : 0} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                <h3 className="text-lg font-medium mb-2">Deepening Your Practice</h3>
                <p className="mb-4 text-sm">
                  As you engage in these deeper practices, consider keeping a journal to track your experiences.
                  Some things you might reflect on:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>How does your experience change from day to day or session to session?</li>
                  <li>What challenges arise when you practice for longer periods?</li>
                  <li>What benefits do you notice from more sustained practice?</li>
                  <li>How does stillness practice affect other areas of your life?</li>
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