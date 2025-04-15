import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, BookOpen, Medal } from 'lucide-react';

export default async function StillnessMasterPage() {
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
  
  // Fetch challenge progress for the stillness master (challenge ID 5)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 5)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const masterChallenges = [
    {
      id: 1,
      title: "Daily Mindfulness Practice",
      duration: "10-15 minutes daily",
      timeSpan: "1 week",
      description: "For one week, begin each day with 10-15 minutes of a chosen mindfulness practice (meditation, prayer, journaling). Document your experience each day.",
      instructions: [
        "Choose a consistent time each morning for your practice.",
        "Select a mindfulness practice that resonates with you (meditation, prayer, journaling, etc.).",
        "Create a dedicated space for your practice that's free from distractions.",
        "Set an intention for your practice at the beginning of each session.",
        "After each session, document your experience, thoughts, and insights.",
        "Notice how the experience changes throughout the week."
      ]
    },
    {
      id: 2,
      title: "14-Day Social Media Fast",
      duration: "Ongoing",
      timeSpan: "14 days",
      description: "Perform a 14-day social media fast. Find something relaxing, fun, or a hobby to do instead.",
      instructions: [
        "Delete social media apps from your phone or use app blockers.",
        "Inform friends and family that you'll be taking a break from social media.",
        "Identify specific hobbies or activities to fill the time you'd normally spend on social media.",
        "Keep a log of how you feel each day without social media.",
        "Notice triggers that make you want to check social media.",
        "Pay attention to how your attention span and focus change over the two weeks."
      ]
    },
    {
      id: 3,
      title: "Mindful Activity Practice",
      duration: "Varies",
      timeSpan: "1 week",
      description: "Choose a specific daily activity (e.g., commuting, eating, working) and, for one week, consciously practice being fully present during that activity. Reflect on your ability to stay focused and engaged.",
      instructions: [
        "Select one regular daily activity that you often do on autopilot.",
        "Set an intention to be fully present during this activity each day.",
        "Pay attention to all sensory experiences during the activity.",
        "When your mind wanders, gently bring it back to the present moment.",
        "After each practice, reflect on what you noticed and how present you were able to stay.",
        "Notice how your experience of this activity changes throughout the week."
      ]
    },
    {
      id: 4,
      title: "Extended Stillness Retreat",
      duration: "2+ hours",
      timeSpan: "Once during the week",
      description: "Over the course of a week, engage in a longer period of stillness (e.g., a half-day retreat, an extended time in nature, a day of silence) and journal about the insights and challenges you experience.",
      instructions: [
        "Choose a day within the week for your extended stillness practice.",
        "Plan the structure of your retreat (location, activities, guidelines).",
        "Minimize or eliminate distractions (phone, notifications, interruptions).",
        "Include various stillness practices (meditation, silent walking, journaling, etc.).",
        "Take breaks as needed, but maintain mindful awareness throughout.",
        "After completing the experience, journal about your insights, challenges, and discoveries."
      ]
    },
    {
      id: 5,
      title: "Comprehensive Reflection",
      duration: "30-60 minutes",
      timeSpan: "After completing the social media fast",
      description: "At the end of the 14-days social media fast, write a comprehensive reflection on how incorporating stillness has affected your overall well-being, stress levels, and ability to focus.",
      instructions: [
        "Set aside 30-60 minutes for deep reflection.",
        "Review any notes or journals you've kept during your stillness practices.",
        "Consider changes you've noticed in yourself (thoughts, emotions, behaviors, relationships).",
        "Reflect on challenges you faced and how you overcame them.",
        "Identify which practices were most beneficial for you and why.",
        "Create a plan for how you'll continue to incorporate stillness into your life moving forward."
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
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">
              👑
            </div>
            <h1 className="text-2xl font-bold">The Stillness Master</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Stillness Master</h2>
            <p className="text-slate-600 mb-6">
              The Stillness Master represents the pinnacle of inner calm and presence. They challenge you to 
              integrate stillness into your daily life over an extended period, creating lasting change through 
              consistent practice. Meeting this master's challenge will earn you the Stillness Badge.
            </p>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">
                  Congratulations! You've completed the Stillness Master's challenge and earned the Stillness Badge! 
                  Continue your journey with the other badges.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Medal className="h-5 w-5" />
                  Master Challenges
                </h3>
                <p className="text-slate-600 mb-6">
                  These challenges represent a significant commitment to developing stillness in your life. 
                  Complete all five challenges to earn your Stillness Badge. These practices build on the skills 
                  you've developed with the other trainers.
                </p>
                
                <div className="space-y-8">
                  {masterChallenges.map((challenge) => (
                    <Card key={challenge.id} className="overflow-hidden border-slate-200">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-white">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-lg">{challenge.title}</h4>
                            <Badge variant="outline" className="bg-white/20 text-white border-white/40">
                              Challenge {challenge.id} of 5
                            </Badge>
                          </div>
                          <div className="flex gap-4 mt-2 text-sm text-white/80">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {challenge.duration}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {challenge.timeSpan}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p>{challenge.description}</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">How to Complete:</h5>
                            <ol className="list-decimal pl-5 space-y-2 text-sm">
                              {challenge.instructions.map((step, idx) => (
                                <li key={`inst-${challenge.id}-${idx}`}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">The Journey of Stillness</h3>
                <p className="mb-4">
                  The path of stillness is not about perfection, but about practice. Each time you return to presence, 
                  you strengthen your capacity for calm and clarity. This badge represents not just moments of stillness, 
                  but a way of being that you can carry with you through all of life's challenges.
                </p>
                <p className="text-sm text-slate-600 italic">
                  "In the midst of movement and chaos, keep stillness inside of you." - Deepak Chopra
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