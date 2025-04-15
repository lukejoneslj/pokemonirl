import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Menu } from 'lucide-react';

export default async function MicrolearningTrainerPage() {
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
  
  // Fetch challenge progress for the microlearning trainer (challenge ID 3)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 3)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const microChallenges = [
    {
      id: 1,
      title: "Mindful Breathing",
      time: "5 minutes",
      description: "Practice mindful breathing for 5 minutes in silence (no music or other distractions).",
      instructions: [
        "Find a quiet, comfortable place to sit with your back straight.",
        "Close your eyes or maintain a soft gaze on a fixed point.",
        "Breathe naturally and focus your attention on the sensation of breath entering and leaving your body.",
        "When your mind wanders (which is normal), gently bring your attention back to your breath.",
        "Try to maintain this focus for the full 5 minutes."
      ]
    },
    {
      id: 2,
      title: "Mindful Eating",
      time: "10-15 minutes",
      description: "Eat one meal mindfully, paying attention to the taste and texture.",
      instructions: [
        "Choose a meal where you can eat without rushing or distractions.",
        "Before eating, take a moment to appreciate the appearance and aroma of your food.",
        "Take small bites and chew slowly, noticing the flavors and textures.",
        "Put your utensils down between bites to help slow the pace.",
        "Notice how the food feels in your mouth and how the flavors change as you chew.",
        "Pay attention to your body's hunger and fullness cues throughout the meal."
      ]
    },
    {
      id: 3,
      title: "Distraction-Free Walk",
      time: "10-20 minutes",
      description: "Take a short walk without any distractions (phone, music), focusing on your senses.",
      instructions: [
        "Choose a safe route for your walk.",
        "Leave your phone behind or turn it off and put it in your pocket.",
        "As you walk, pay attention to what you see around you – colors, shapes, movement.",
        "Notice the sounds you hear – birds, wind, distant voices, your footsteps.",
        "Feel the sensations in your body – your feet touching the ground, the air on your skin.",
        "If your mind wanders, gently bring your attention back to your senses."
      ]
    },
    {
      id: 4,
      title: "Active Listening Practice",
      time: "Duration of a conversation",
      description: "Practice active listening, using techniques from the provided article, during one conversation with someone you don't usually listen to attentively.",
      instructions: [
        "Choose a conversation partner – this could be a family member, friend, or colleague.",
        "Give your full attention to the speaker without planning what you'll say next.",
        "Make appropriate eye contact and use supportive body language.",
        "Avoid interrupting or offering solutions unless specifically asked.",
        "Ask clarifying questions to ensure understanding.",
        "Briefly summarize what you've heard to confirm you've understood correctly."
      ]
    },
    {
      id: 5,
      title: "Prayerful Connection",
      time: "5-10 minutes",
      description: "Pray aloud on your knees, expressing personal thoughts and feelings to God.",
      instructions: [
        "Find a quiet, private space where you can speak aloud without feeling self-conscious.",
        "Kneel down in a comfortable position.",
        "Begin by addressing God and expressing gratitude for specific blessings.",
        "Share your honest thoughts, feelings, concerns, and questions.",
        "Ask for guidance, strength, or other specific needs.",
        "Conclude your prayer, traditionally saying 'Amen.'",
        "Remain kneeling for a moment, allowing yourself to feel any peace or impressions that come."
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
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl">
              🎭
            </div>
            <h1 className="text-2xl font-bold">The Microlearning Trainer</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              This trainer believes in practical learning through small, focused exercises. They will 
              guide you through simple actionable practices of stillness that you can integrate into your daily life.
              Each mini-challenge takes only a short time but can have a profound impact on your mindfulness practice.
            </p>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Mini-Challenges</h3>
                <p className="text-slate-600 mb-6">
                  Choose at least one mini-challenge to complete. Each is designed to help you 
                  practice being present and mindful in different contexts. After completing a 
                  challenge, take a moment to reflect on the experience.
                </p>
                
                <div className="space-y-6">
                  {microChallenges.map((challenge) => (
                    <Card key={challenge.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <div className="flex items-center text-sm text-green-700">
                            <Clock className="h-4 w-4 mr-1" />
                            {challenge.time}
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          <p>{challenge.description}</p>
                          
                          <div>
                            <h5 className="text-sm font-medium flex items-center mb-2">
                              <Menu className="h-4 w-4 mr-1" />
                              Instructions
                            </h5>
                            <ol className="list-decimal pl-5 space-y-1 text-sm">
                              {challenge.instructions.map((step, idx) => (
                                <li key={idx}>{step}</li>
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
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium mb-2">Tracking Your Experience</h3>
                <p className="mb-4 text-sm">
                  After completing each mini-challenge, consider:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>What did you notice during the practice?</li>
                  <li>What sensations, thoughts, or emotions arose?</li>
                  <li>How different did this feel from your usual way of doing this activity?</li>
                  <li>What made this practice easy or difficult?</li>
                  <li>How might you incorporate aspects of this practice into your daily routine?</li>
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