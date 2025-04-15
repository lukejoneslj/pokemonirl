import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Calendar, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default async function CharityGymLeaderPage() {
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
  
  // Fetch challenge progress for the charity gym leader (challenge ID 10)
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('challenge_id', 10)
    .single();
  
  const isCompleted = challengeProgress?.completed || false;
  
  const gymChallenges = [
    {
      id: 1,
      title: "7-Day Contention Fast",
      duration: "7 Days",
      description: "Commit to a full week with absolutely no arguments, criticisms, or defensive responses. When faced with potential conflict, choose understanding and peace instead.",
      steps: [
        "Day 1-7: Eliminate all forms of contention from your interactions",
        "Replace arguments with questions and curiosity",
        "When criticized, respond with 'Thank you for that feedback'",
        "When tempted to criticize others, find something to appreciate instead",
        "When others are contentious, be the peacemaker who de-escalates",
        "Each night, journal about your successes and challenges",
        "If you slip up, acknowledge it, learn from it, and recommit"
      ]
    },
    {
      id: 2,
      title: "Charity Journal Challenge",
      duration: "7 Days",
      description: "Keep a daily 'charity journal' for a week, recording each time you choose understanding over judgment. Document at least three instances each day when you practiced seeing others through a lens of charity.",
      steps: [
        "Create or designate a specific journal for this challenge",
        "Each morning, set an intention to look for opportunities to practice charity",
        "Throughout the day, notice moments when you choose understanding over judgment",
        "Record at least three specific instances daily, describing:",
        "- The situation or interaction",
        "- Your natural impulse or judgment",
        "- How you chose charity instead",
        "- What you learned from the experience",
        "At the end of the week, review your entries and identify patterns"
      ]
    },
    {
      id: 3,
      title: "Pray for Those You Struggle With",
      duration: "10 Days",
      description: "For 10 days, pray specifically for those you struggle to love, then do one kind act for them. This challenge helps transform how you see and treat those who are difficult to love.",
      steps: [
        "Identify 1-3 people you find difficult to love or understand",
        "Each morning for 10 days, pray specifically for their wellbeing",
        "In your prayer, ask to see them as God sees them",
        "Find something specific to appreciate about them each day",
        "By day 5, plan a kind act you can do for each person",
        "Complete these kind acts by day 10",
        "Record how your feelings toward these people change throughout the challenge"
      ]
    },
    {
      id: 4,
      title: "Peacemaker Plan",
      duration: "7+ Days",
      description: "Create and implement a 'peacemaker plan' with specific actions to build bridges with someone you've had conflict with. This challenge tests your ability to apply all the principles of charity you've learned.",
      steps: [
        "Identify a relationship where there has been conflict or distance",
        "Reflect on the conflict: What happened? What were both perspectives?",
        "Create a written plan with at least 5 specific actions to heal the relationship",
        "Your plan should include: listening, understanding, apologizing (if appropriate), finding common ground, and working toward reconciliation",
        "Implement your plan over at least a week",
        "Document your progress and the other person's responses",
        "Adjust your approach as needed with charity and patience",
        "Complete a final reflection on what you learned about being a peacemaker"
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
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xl">
              👑
            </div>
            <h1 className="text-2xl font-bold">Cynthia: The Hidden Saint Gym Leader</h1>
          </div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About The Gym Leader</h2>
            <p className="text-slate-600 mb-6">
              Cynthia is the powerful and compassionate Gym Leader of the Charity Badge. As the champion of the 
              Sinnoh region, she's known for both her strength and her kindness toward all Pokémon and trainers. 
              She will challenge you to demonstrate true mastery and commitment to charity through extended 
              challenges that test your ability to love others unconditionally.
            </p>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
              <p className="italic text-red-800">
                "You'll know me not by name—but by the love you gave others."
              </p>
            </div>
            
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6" />
                <p className="text-green-800">Congratulations! You've completed the Gym Leader challenge and earned the Charity Badge!</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="h-6 w-6 text-red-800" />
                  <h3 className="text-lg font-medium">Final Challenge</h3>
                </div>
                <p className="mb-2">
                  This is your final test on the path to earning the Charity Badge. These challenges will 
                  take at least 7-10 days to complete and require consistent dedication to the principles 
                  of charity, understanding, and peacemaking.
                </p>
                <p className="text-sm italic">
                  "Charity is the antidote to contention. Charity is the spiritual gift that helps us to cast off 
                  the natural man, who is selfish, defensive, prideful, and jealous... 
                  The pure love of Christ is the answer to the contention that ails us today."
                  — President Russell M. Nelson
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-1">
                {gymChallenges.map((challenge) => (
                  <Card key={challenge.id} className={isCompleted ? "opacity-70" : ""}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{challenge.title}</CardTitle>
                        <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{challenge.duration}</span>
                        </div>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-semibold mb-2 text-slate-700">Challenge Journey:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                        {challenge.steps.map((step, index) => (
                          <li key={`step-${challenge.id}-${index}`}>{step}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-medium mb-4">Earning Your Badge</h3>
                <p className="mb-4">
                  To earn the Charity Badge, complete <strong>all four</strong> of the challenges above. 
                  These challenges are designed to be difficult—they require consistent practice of 
                  charity over an extended period. The true test is not in perfect performance, but in 
                  sincere effort and growth.
                </p>
                <p className="mb-6">
                  When you have completed the challenges, return to the badge page to mark this final 
                  level complete and earn your Charity Badge!
                </p>
                
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress toward Charity Badge</span>
                    <span>{isCompleted ? "Complete!" : "In Progress"}</span>
                  </div>
                  <Progress value={isCompleted ? 100 : 80} className="h-2" />
                </div>
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