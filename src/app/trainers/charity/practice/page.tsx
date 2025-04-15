import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default async function CharityPracticeTrainerPage() {
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
  
  // Fetch challenge progress for the charity practice trainer (challenge ID 8)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 8)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const practiceExercises = [
    {
      id: 1,
      title: "Five Minutes of Complete Listening",
      description: "Ask someone you disagree with to explain their perspective on a topic for 5 minutes without interruption. Your only responses should be nodding, affirming phrases like 'I hear you,' and asking clarifying questions. Do not defend your position or counter their points.",
      instructions: [
        "Choose a topic you have different views on",
        "Set a timer for 5 minutes",
        "Listen with the goal to understand, not respond",
        "Thank them sincerely for sharing, regardless of your agreement"
      ]
    },
    {
      id: 2,
      title: "The Five Questions Challenge",
      description: "During your next conversation about a complex or potentially divisive topic, ask five thoughtful questions before sharing your own opinion. This practice helps you understand the other person's reasoning and values instead of rushing to judgment.",
      instructions: [
        "Prepare open-ended questions that start with 'What' or 'How'",
        "Avoid 'Why' questions that can sound accusatory",
        "Listen fully to each answer before asking the next question",
        "Validate their perspective: 'That makes sense because...'"
      ]
    },
    {
      id: 3,
      title: "Criticism Response Exercise",
      description: "When you receive criticism or negative feedback, practice responding only with 'Thank you for sharing that perspective' followed by a reflective statement. Do not defend yourself or explain your actions, even if you disagree with the criticism.",
      instructions: [
        "Breathe deeply when receiving criticism",
        "Say 'Thank you for sharing that perspective'",
        "Add a reflective statement like 'I can see why that would be frustrating'",
        "Ask: 'What would be most helpful to you in this situation?'"
      ]
    },
    {
      id: 4,
      title: "'I' Statements Practice",
      description: "During a potentially difficult conversation, practice using only 'I' statements instead of accusatory 'You' statements. This shifts the focus from blame to your own experience and feelings.",
      instructions: [
        "Instead of 'You always interrupt me' say 'I feel frustrated when I can't finish my thought'",
        "Instead of 'You don't care' say 'I feel hurt when my concerns aren't addressed'",
        "Include: how you feel, what triggered the feeling, and what would help",
        "Monitor your tone to ensure it remains non-accusatory"
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
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl">
              🎭
            </div>
            <h1 className="text-2xl font-bold">Officer Jenny: Elder Basket</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Trainer</h2>
            <p className="text-slate-600 mb-6">
              Officer Jenny believes in practical learning through small, focused exercises. She's dedicated 
              to maintaining peace and order, and knows that true charity requires hands-on practice. 
              Your challenge is to complete these microlearning exercises that apply principles of understanding 
              and peacemaking in real-life interactions.
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
              <p className="italic text-green-800">
                "Charity is not just for those who deserve it."
              </p>
            </div>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">You've completed this challenge! Continue your journey with the other trainers.</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-6">
                <h3 className="text-lg font-medium mb-2">Practice Instructions</h3>
                <p className="mb-2">
                  Complete all four practical exercises below. Each one helps you develop a specific skill for 
                  charitable communication and peacemaking. These exercises may feel uncomfortable at first—that 
                  means they're working!
                </p>
                <p className="text-sm italic mb-2">
                  "The best is yet to come for those who spend their lives building up others." — President Russell M. Nelson
                </p>
                <p className="text-sm">
                  Track your completion by checking the boxes below. When you're done with all exercises, 
                  return to the badge page to mark this challenge complete.
                </p>
              </div>
              
              <div className="space-y-8">
                {practiceExercises.map((exercise) => (
                  <div key={exercise.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                      <h4 className="font-semibold text-lg">{exercise.title}</h4>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`check-${exercise.id}`} disabled={isCompleted} />
                        <Label htmlFor={`check-${exercise.id}`} className="text-sm font-medium">
                          Completed
                        </Label>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="mb-4 text-slate-700">{exercise.description}</p>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2 text-sm text-slate-700">Specific Steps:</h5>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                          {exercise.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
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