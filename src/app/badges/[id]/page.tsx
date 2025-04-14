import { redirect, notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BadgeChallenge from '@/components/badges/BadgeChallenge';

// Challenge type
type ChallengeType = 'study' | 'reflect' | 'roleplay' | 'apply' | 'boss';

interface Challenge {
  id: number;
  type: ChallengeType;
  title: string;
  description: string;
  completed: boolean;
}

// Badge challenge data with trainers
const BADGE_CHALLENGES: Record<number, Challenge[]> = {
  1: [ // Stillness Badge
    { 
      id: 1, 
      type: 'study', 
      title: 'Sister Serenity', 
      description: '"Before you can quiet the world, you must quiet your heart." Watch a short devotional or video on stillness and journal your takeaways.', 
      completed: false 
    },
    { 
      id: 2, 
      type: 'reflect', 
      title: 'Brother Echo', 
      description: '"What\'s louder—your life, or your thoughts?" Answer introspective questions about what distracts you and when you feel most calm.', 
      completed: false 
    },
    { 
      id: 3, 
      type: 'roleplay', 
      title: 'Elder Silence', 
      description: '"You must sit with your soul to know it." Do a 5-minute silent reflection practice, imagining yourself being calm in chaos.', 
      completed: false 
    },
    { 
      id: 4, 
      type: 'apply', 
      title: 'Sister Willow', 
      description: '"Stillness is not the absence of movement, but the presence of peace." Practice 10 minutes of stillness for 3 days—meditate, journal, pray, etc.', 
      completed: false 
    },
    { 
      id: 5, 
      type: 'boss', 
      title: 'Master Still', 
      description: '"When the storm is loud, I am louder in my silence." Complete 7 consecutive days of stillness. Log a reflection each time.', 
      completed: false 
    },
  ],
  2: [ // Charity Badge
    { 
      id: 6, 
      type: 'study', 
      title: 'Brother Hands', 
      description: '"Love without action is just a feeling." Learn about charity through a talk or devotional. Identify what loving like Christ looks like.', 
      completed: false 
    },
    { 
      id: 7, 
      type: 'reflect', 
      title: 'Sister Grace', 
      description: '"Is your love conditional?" Reflect on someone who is hard to love. Why? What holds you back?', 
      completed: false 
    },
    { 
      id: 8, 
      type: 'roleplay', 
      title: 'Elder Basket', 
      description: '"Charity is not just for those who deserve it." Roleplay a moment where you give grace when it\'s hardest.', 
      completed: false 
    },
    { 
      id: 9, 
      type: 'apply', 
      title: 'Captain Heart', 
      description: '"Service is love in uniform." Do a kind act daily for 3 days (preferably anonymous).', 
      completed: false 
    },
    { 
      id: 10, 
      type: 'boss', 
      title: 'The Hidden Saint', 
      description: '"You\'ll know me not by name—but by the love you gave others." Do one sacrificial act of love. Share the experience in a journal or video.', 
      completed: false 
    },
  ],
  3: [ // Virtue Badge
    { 
      id: 11, 
      type: 'study', 
      title: 'Sir Honor', 
      description: '"True strength begins in unseen choices." Read a short piece on virtue. Define what virtue means to you.', 
      completed: false 
    },
    { 
      id: 12, 
      type: 'reflect', 
      title: 'Lady Truth', 
      description: '"Where in your life are you wearing masks?" Reflect on your small dishonesties or moments you avoid truth.', 
      completed: false 
    },
    { 
      id: 13, 
      type: 'roleplay', 
      title: 'Brother Flint', 
      description: '"The furnace of pressure reveals the shape of your character." Imagine facing a moral test—then journal how you would respond.', 
      completed: false 
    },
    { 
      id: 14, 
      type: 'apply', 
      title: 'Sister Laurel', 
      description: '"Speak with love. But speak." Live 3 days of high-integrity actions. Do what you say you will.', 
      completed: false 
    },
    { 
      id: 15, 
      type: 'boss', 
      title: 'Judge Valor', 
      description: '"Only you know if you\'ve been true." Face a real-life scenario where you must speak or act with integrity.', 
      completed: false 
    },
  ],
  4: [ // Courage Badge
    { 
      id: 16, 
      type: 'study', 
      title: 'Scout Blaze', 
      description: '"Fear screams. Courage whispers back." Read or watch a short story about spiritual courage. Define your fears.', 
      completed: false 
    },
    { 
      id: 17, 
      type: 'reflect', 
      title: 'Sister Flare', 
      description: '"What\'s the truth you\'re afraid to live out loud?" Reflect on what you\'re avoiding due to fear.', 
      completed: false 
    },
    { 
      id: 18, 
      type: 'roleplay', 
      title: 'Brother Roar', 
      description: '"Even lions shake sometimes. But they still roar." Write a scenario where you act courageously.', 
      completed: false 
    },
    { 
      id: 19, 
      type: 'apply', 
      title: 'Elder Torch', 
      description: '"Light the way, even if your voice shakes." Do 3 things that scare you a little (vulnerability, honesty, risk).', 
      completed: false 
    },
    { 
      id: 20, 
      type: 'boss', 
      title: 'Captain Valor', 
      description: '"Will you stand, even when no one else is?" Face one real-world fear (conversation, confrontation, or risk).', 
      completed: false 
    },
  ],
  5: [ // Discipline Badge
    { 
      id: 21, 
      type: 'study', 
      title: 'Coach Steel', 
      description: '"Motivation gets you started. Discipline gets you there." Study a short piece on building discipline. Write a habit you want to build.', 
      completed: false 
    },
    { 
      id: 22, 
      type: 'reflect', 
      title: 'Sister Rhythm', 
      description: '"Where are you ruled by impulse?" Reflect on your triggers and what habits derail you.', 
      completed: false 
    },
    { 
      id: 23, 
      type: 'roleplay', 
      title: 'Brother Grit', 
      description: '"Discipline means showing up. Especially when you don\'t want to." Roleplay a difficult morning where you stay committed.', 
      completed: false 
    },
    { 
      id: 24, 
      type: 'apply', 
      title: 'Elder Lockstep', 
      description: '"Repetition is your revolution." Do one habit for 5 days straight. Track and reflect.', 
      completed: false 
    },
    { 
      id: 25, 
      type: 'boss', 
      title: 'General Echo', 
      description: '"The world won\'t change until you do." Complete 10 days of the habit. Submit a final summary of growth.', 
      completed: false 
    },
  ],
  6: [ // Gratitude Badge
    { 
      id: 26, 
      type: 'study', 
      title: 'Sister Ember', 
      description: '"Gratitude reframes every moment." Read/watch content on the power of gratitude. Define what you\'re most thankful for.', 
      completed: false 
    },
    { 
      id: 27, 
      type: 'reflect', 
      title: 'Brother Roots', 
      description: '"You\'re already living someone\'s dream." Reflect on what you take for granted. Write about it.', 
      completed: false 
    },
    { 
      id: 28, 
      type: 'roleplay', 
      title: 'Sister Song', 
      description: '"Even in pain, there is praise." Roleplay expressing gratitude in a hard moment.', 
      completed: false 
    },
    { 
      id: 29, 
      type: 'apply', 
      title: 'The Collector', 
      description: '"Every moment is a gift. Collect them." Write 3 thank-you messages. Log gratitude daily for 3 days.', 
      completed: false 
    },
    { 
      id: 30, 
      type: 'boss', 
      title: 'The Thankful One', 
      description: '"Can you be grateful when the blessings hide?" Show gratitude during hardship. Journal the story.', 
      completed: false 
    },
  ],
  7: [ // Purpose Badge
    { 
      id: 31, 
      type: 'study', 
      title: 'Seeker Dawn', 
      description: '"You were made for something. Let\'s find out what." Study purpose through scripture/story. Define what lights your fire.', 
      completed: false 
    },
    { 
      id: 32, 
      type: 'reflect', 
      title: 'Elder Compass', 
      description: '"Where have your gifts already been used?" Reflect on moments when you felt most alive and aligned.', 
      completed: false 
    },
    { 
      id: 33, 
      type: 'roleplay', 
      title: 'Sister Truthpath', 
      description: '"What story are you writing?" Write your life\'s mission or obituary as if you lived your purpose.', 
      completed: false 
    },
    { 
      id: 34, 
      type: 'apply', 
      title: 'The Artisan', 
      description: '"Purpose is not a destination. It\'s a direction." Create a weekly plan to align your actions with your purpose.', 
      completed: false 
    },
    { 
      id: 35, 
      type: 'boss', 
      title: 'The Guide', 
      description: '"Only you can walk your path." Commit to one real-life project or goal for 1 week and follow through.', 
      completed: false 
    },
  ],
  8: [ // Light Badge (Final)
    { 
      id: 36, 
      type: 'study', 
      title: 'The Integrator', 
      description: '"You have all the tools. Now live them together." Do one act from any previous badge each day for a week.', 
      completed: false 
    },
    { 
      id: 37, 
      type: 'reflect', 
      title: 'The Messenger', 
      description: '"The light isn\'t just for you—it\'s meant to be shared." Write your testimony or story of growth.', 
      completed: false 
    },
    { 
      id: 38, 
      type: 'roleplay', 
      title: 'The Pilgrim', 
      description: '"This isn\'t the end. It\'s the start." Reflect on what\'s next. Record a message to your future self.', 
      completed: false 
    },
    { 
      id: 39, 
      type: 'apply', 
      title: 'The Mentor', 
      description: '"Become the trainer you once needed." Help someone else begin their journey. Invite or encourage a friend.', 
      completed: false 
    },
    { 
      id: 40, 
      type: 'boss', 
      title: 'The Divine Light', 
      description: '"You were never alone." Commit to living by light. You unlock the final badge when you can honestly say you\'re walking the path—imperfectly, but consistently.', 
      completed: false 
    },
  ],
};

// Badge info
const BADGES = {
  1: { name: 'Stillness Badge', icon: '🧘‍♂️', color: 'bg-blue-500', description: 'Master the art of meditation and mindfulness to cultivate inner peace.' },
  2: { name: 'Charity Badge', icon: '❤️', color: 'bg-red-500', description: 'Serve others selflessly with acts of kindness and generosity.' },
  3: { name: 'Virtue Badge', icon: '⭐', color: 'bg-yellow-500', description: 'Develop moral character through daily practice of virtuous actions.' },
  4: { name: 'Courage Badge', icon: '🦁', color: 'bg-amber-500', description: 'Face your fears and stand for truth even when it\'s difficult.' },
  5: { name: 'Discipline Badge', icon: '⏰', color: 'bg-orange-500', description: 'Build self-control and resilience through consistent habits.' },
  6: { name: 'Gratitude Badge', icon: '🙏', color: 'bg-green-500', description: 'Cultivate a thankful heart in all circumstances.' },
  7: { name: 'Purpose Badge', icon: '🌱', color: 'bg-indigo-500', description: 'Discover and pursue your unique mission and calling.' },
  8: { name: 'Light Badge', icon: '💡', color: 'bg-slate-800', description: 'Integrate all virtues to become your best self and guide others.' },
};

// Using any type to bypass Next.js type constraint issues
// This is necessary because of a type mismatch between expected PageProps and our params structure
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BadgePage(props: any) {
  const badgeId = Number.parseInt(props.params.id, 10);
  
  // Validate badge ID
  if (Number.isNaN(badgeId) || badgeId < 1 || badgeId > 8) {
    notFound();
  }
  
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
  
  // Fetch challenge progress for this badge
  const { data: challengeProgress } = await supabase
    .from('challenge_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('badge_id', badgeId);
  
  // Get badge info
  const badge = BADGES[badgeId as keyof typeof BADGES];
  
  // Get challenges for this badge
  const challenges = BADGE_CHALLENGES[badgeId as keyof typeof BADGE_CHALLENGES] || [];
  
  // Update completion status from database
  const updatedChallenges = challenges.map(challenge => ({
    ...challenge,
    completed: challengeProgress?.some((cp: { challenge_id: number; completed: boolean }) => 
      cp.challenge_id === challenge.id && cp.completed) || false
  }));
  
  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader user={profile} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              Back to Badge Map
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center text-xl`}>
              {badge.icon}
            </div>
            <h1 className="text-2xl font-bold">{badge.name}</h1>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Challenge Path</h2>
            <p className="text-slate-600 mb-6">
              {badge.description} Complete these challenges in order to earn your {badge.name}. 
              Each trainer will guide you through a stage of your journey.
            </p>
            
            <div className="space-y-4">
              {updatedChallenges.map((challenge, index) => (
                <BadgeChallenge
                  key={challenge.id}
                  challenge={challenge}
                  step={index + 1}
                  userId={session.user.id}
                  badgeId={badgeId}
                  isLocked={index > 0 && !updatedChallenges[index - 1].completed}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 