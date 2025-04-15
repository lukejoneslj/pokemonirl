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
  trainerPath?: string; // Add this for linking to trainer pages
}

// Badge challenge data with trainers
const BADGE_CHALLENGES: Record<number, Challenge[]> = {
  1: [ // Stillness Badge
    { 
      id: 1, 
      type: 'study', 
      title: 'Professor Oak: The Study Trainer', 
      description: 'Learning the principles of stillness and mindfulness. Read "Mindfulness Workbook" from UW-Madison, "How to Pray" from LDS, and "Active Listening Techniques" from Positive Psychology. Study the benefits of reducing distractions and being present, and explore the concept of "beginner\'s mind."', 
      completed: false,
      trainerPath: '/trainers/stillness/study'
    },
    { 
      id: 2, 
      type: 'reflect', 
      title: 'Sabrina: The Reflect Trainer', 
      description: 'Journaling and reflecting on personal experiences with stillness. Answer reflective questions: When did you feel truly present today? What distractions pull you away from the present moment? After trying breathing techniques, what did you notice? How do you experience stillness in your life? When has prayer brought you peace? How can prayer help cultivate daily stillness?', 
      completed: false,
      trainerPath: '/trainers/stillness/reflect'
    },
    { 
      id: 3, 
      type: 'roleplay', 
      title: 'Brock: The Microlearning Trainer', 
      description: 'Engaging in small, actionable practices of stillness. Practice mindful breathing for 5 minutes in silence. Eat one meal mindfully, focusing on taste and texture. Take a short walk without distractions, focusing on your senses. Practice active listening during one conversation with someone you don\'t usually listen to attentively. Pray aloud on your knees, expressing personal thoughts and feelings to God.', 
      completed: false,
      trainerPath: '/trainers/stillness/microlearning'
    },
    { 
      id: 4, 
      type: 'apply', 
      title: 'Erika: The Deeper Practice Trainer', 
      description: 'Committing to a more significant period of stillness practice. Dedicate 15 minutes each day for two days to mindfulness or prayer. Complete two 4-hour sessions without using your phone during non-work hours, focusing on mindful activities instead of social media. Practice mindful listening during four separate conversations in one day.', 
      completed: false,
      trainerPath: '/trainers/stillness/deeper'
    },
    { 
      id: 5, 
      type: 'boss', 
      title: 'Giovanni: The Stillness Gym Leader', 
      description: 'Integrating stillness into daily life over an extended period. For one week, begin each day with 10-15 minutes of mindfulness practice and document your experience. Perform a 14-day social media fast, finding relaxing alternatives. Choose a specific daily activity and practice being fully present during it for one week, reflecting on your focus. Engage in a longer period of stillness during the week and journal about insights. At the end of the 14-day social media fast, write a comprehensive reflection on how stillness has affected your wellbeing.', 
      completed: false,
      trainerPath: '/trainers/stillness/master'
    },
  ],
  2: [ // Charity Badge
    { 
      id: 6, 
      type: 'study', 
      title: 'Nurse Joy: Brother Hands', 
      description: '"Love without action is just a feeling." Study these resources on charity and understanding: "Kindness in Difference" to understand approaching others with empathy, "Seek First to Understand" about listening before being heard, MLK\'s "Letter from Birmingham Jail" on justice and compassion, and President Nelson\'s "Peacemakers Needed" talk on becoming a peacemaker in a contentious world.', 
      completed: false,
      trainerPath: '/trainers/charity/study'
    },
    { 
      id: 7, 
      type: 'reflect', 
      title: 'Misty: Sister Grace', 
      description: '"Is your love conditional?" Reflect deeply by answering: 1) Who is someone you struggle to show charity toward and why? 2) When have you felt truly understood by someone who disagreed with you? 3) What barriers prevent you from listening to understand rather than to respond? 4) How might your life change if you chose to be a peacemaker in every interaction? 5) What specific contentious behaviors do you need to abandon?', 
      completed: false,
      trainerPath: '/trainers/charity/reflect'
    },
    { 
      id: 8, 
      type: 'roleplay', 
      title: 'Officer Jenny: Elder Basket', 
      description: '"Charity is not just for those who deserve it." Practice these specific exercises: 1) Ask someone you disagree with to explain their perspective for 5 minutes without interruption, only responding with validation. 2) Have a conversation where you ask five questions before sharing your opinion. 3) When criticized, respond only with "Thank you for sharing that perspective" and reflection rather than defense. 4) Practice using "I" statements instead of accusatory "you" statements during a difficult conversation.', 
      completed: false,
      trainerPath: '/trainers/charity/practice'
    },
    { 
      id: 9, 
      type: 'apply', 
      title: 'Lt. Surge: Captain Heart', 
      description: '"Service is love in uniform." Complete these 3-day challenges: 1) For one day, commit to zero criticism or contentious speech with anyone, replacing judgment with curiosity. 2) For two days, reach out to someone with different beliefs and find three things you sincerely admire about them. 3) For three days, perform one anonymous act of service each day for someone who would never expect it from you.', 
      completed: false,
      trainerPath: '/trainers/charity/apply'
    },
    { 
      id: 10, 
      type: 'boss', 
      title: 'Cynthia: The Hidden Saint Gym Leader', 
      description: '"You\'ll know me not by name—but by the love you gave others." Master these challenges over 7+ days: 1) Commit to a 7-day "contention fast"—no arguments, criticisms, or defensive responses. 2) Keep a daily "charity journal" for a week, recording each time you choose understanding over judgment. 3) For 10 days, pray specifically for those you struggle to love, then do one kind act for them. 4) Create and implement a "peacemaker plan" with specific actions to build bridges with someone you\'ve had conflict with.', 
      completed: false,
      trainerPath: '/trainers/charity/master'
    },
  ],
  3: [ // Virtue Badge
    { 
      id: 11, 
      type: 'study', 
      title: 'Lance: Sir Honor', 
      description: '"True strength begins in unseen choices." Read a short piece on virtue. Define what virtue means to you.', 
      completed: false 
    },
    { 
      id: 12, 
      type: 'reflect', 
      title: 'Lorelei: Lady Truth', 
      description: '"Where in your life are you wearing masks?" Reflect on your small dishonesties or moments you avoid truth.', 
      completed: false 
    },
    { 
      id: 13, 
      type: 'roleplay', 
      title: 'Bruno: Brother Flint', 
      description: '"The furnace of pressure reveals the shape of your character." Imagine facing a moral test—then journal how you would respond.', 
      completed: false 
    },
    { 
      id: 14, 
      type: 'apply', 
      title: 'Agatha: Sister Laurel', 
      description: '"Speak with love. But speak." Live 3 days of high-integrity actions. Do what you say you will.', 
      completed: false 
    },
    { 
      id: 15, 
      type: 'boss', 
      title: 'Steven: Judge Valor Gym Leader', 
      description: '"Only you know if you\'ve been true." Face a real-life scenario where you must speak or act with integrity.', 
      completed: false 
    },
  ],
  4: [ // Courage Badge
    { 
      id: 16, 
      type: 'study', 
      title: 'Koga: Scout Blaze', 
      description: '"Fear screams. Courage whispers back." Read or watch a short story about spiritual courage. Define your fears.', 
      completed: false 
    },
    { 
      id: 17, 
      type: 'reflect', 
      title: 'Janine: Sister Flare', 
      description: '"What\'s the truth you\'re afraid to live out loud?" Reflect on what you\'re avoiding due to fear.', 
      completed: false 
    },
    { 
      id: 18, 
      type: 'roleplay', 
      title: 'Blue: Brother Roar', 
      description: '"Even lions shake sometimes. But they still roar." Write a scenario where you act courageously.', 
      completed: false 
    },
    { 
      id: 19, 
      type: 'apply', 
      title: 'Red: Elder Torch', 
      description: '"Light the way, even if your voice shakes." Do 3 things that scare you a little (vulnerability, honesty, risk).', 
      completed: false 
    },
    { 
      id: 20, 
      type: 'boss', 
      title: 'Wallace: Captain Valor Gym Leader', 
      description: '"Will you stand, even when no one else is?" Face one real-world fear (conversation, confrontation, or risk).', 
      completed: false 
    },
  ],
  5: [ // Discipline Badge
    { 
      id: 21, 
      type: 'study', 
      title: 'Chuck: Coach Steel', 
      description: '"Motivation gets you started. Discipline gets you there." Study a short piece on building discipline. Write a habit you want to build.', 
      completed: false 
    },
    { 
      id: 22, 
      type: 'reflect', 
      title: 'Whitney: Sister Rhythm', 
      description: '"Where are you ruled by impulse?" Reflect on your triggers and what habits derail you.', 
      completed: false 
    },
    { 
      id: 23, 
      type: 'roleplay', 
      title: 'Morty: Brother Grit', 
      description: '"Discipline means showing up. Especially when you don\'t want to." Roleplay a difficult morning where you stay committed.', 
      completed: false 
    },
    { 
      id: 24, 
      type: 'apply', 
      title: 'Jasmine: Elder Lockstep', 
      description: '"Repetition is your revolution." Do one habit for 5 days straight. Track and reflect.', 
      completed: false 
    },
    { 
      id: 25, 
      type: 'boss', 
      title: 'Falkner: General Echo Gym Leader', 
      description: '"The world won\'t change until you do." Complete 10 days of the habit. Submit a final summary of growth.', 
      completed: false 
    },
  ],
  6: [ // Gratitude Badge
    { 
      id: 26, 
      type: 'study', 
      title: 'Blaine: Sister Ember', 
      description: '"Gratitude reframes every moment." Read/watch content on the power of gratitude. Define what you\'re most thankful for.', 
      completed: false 
    },
    { 
      id: 27, 
      type: 'reflect', 
      title: 'Gardenia: Brother Roots', 
      description: '"You\'re already living someone\'s dream." Reflect on what you take for granted. Write about it.', 
      completed: false 
    },
    { 
      id: 28, 
      type: 'roleplay', 
      title: 'Fantina: Sister Song', 
      description: '"Even in pain, there is praise." Roleplay expressing gratitude in a hard moment.', 
      completed: false 
    },
    { 
      id: 29, 
      type: 'apply', 
      title: 'Candice: The Collector', 
      description: '"Every moment is a gift. Collect them." Write 3 thank-you messages. Log gratitude daily for 3 days.', 
      completed: false 
    },
    { 
      id: 30, 
      type: 'boss', 
      title: 'Volkner: The Thankful One Gym Leader', 
      description: '"Can you be grateful when the blessings hide?" Show gratitude during hardship. Journal the story.', 
      completed: false 
    },
  ],
  7: [ // Purpose Badge
    { 
      id: 31, 
      type: 'study', 
      title: 'Bugsy: The Seeker', 
      description: '"The path begins with a question." Study purpose and meaning. Read content on faith and life mission.', 
      completed: false 
    },
    { 
      id: 32, 
      type: 'reflect', 
      title: 'Maylene: The Pilgrim', 
      description: '"Every journey is a mirror." Reflect on your life story so far. What patterns emerge? What gives you meaning?', 
      completed: false 
    },
    { 
      id: 33, 
      type: 'roleplay', 
      title: 'Flannery: The Cartographer', 
      description: '"Your path will be your own." Write out a possible purpose statement. Practice introducing yourself with it.', 
      completed: false 
    },
    { 
      id: 34, 
      type: 'apply', 
      title: 'Winona: The Wayfinder', 
      description: '"Live as if every day reveals your purpose." Conduct 3 experiments in living more purposefully. Seek meaning.', 
      completed: false 
    },
    { 
      id: 35, 
      type: 'boss', 
      title: 'Clair: The Oracle Gym Leader', 
      description: '"Your purpose is both found and created." Write your purpose statement after all your explorations. Share it.', 
      completed: false 
    },
  ],
  8: [ // Service Badge
    { 
      id: 36, 
      type: 'study', 
      title: 'Pryce: The Volunteer', 
      description: '"Service reveals your gifts." Learn about different forms of service. Study the concept of ministry.', 
      completed: false 
    },
    { 
      id: 37, 
      type: 'reflect', 
      title: 'Roxanne: The Giver', 
      description: '"What parts of service scare you?" Reflect on your barriers to service. Consider what it means to "wash feet."', 
      completed: false 
    },
    { 
      id: 38, 
      type: 'roleplay', 
      title: 'Brawly: The Server', 
      description: '"Practice the art of seeing needs." Brainstorm 10 ways you could serve others in your normal life routines.', 
      completed: false 
    },
    { 
      id: 39, 
      type: 'apply', 
      title: 'Wattson: The Minister', 
      description: '"To serve is to lead." Complete 3 acts of service for people you know. One for family, one for a friend, one for someone in need.', 
      completed: false 
    },
    { 
      id: 40, 
      type: 'boss', 
      title: 'Alder: The Servant Leader Gym Leader', 
      description: '"The greatest among you will be your servant." Design and execute a service project that addresses a real need.', 
      completed: false 
    },
  ],
};

// Badge info
const BADGES = {
  1: { name: 'Stillness Badge', icon: '🧘‍♂️', color: 'bg-blue-500', description: 'Cultivate inner calm, mindfulness, and presence through meditation, prayer, and focused attention.' },
  2: { name: 'Charity Badge', icon: '❤️', color: 'bg-red-500', description: 'Serve others selflessly with acts of kindness and generosity.' },
  3: { name: 'Virtue Badge', icon: '⭐', color: 'bg-yellow-500', description: 'Develop moral character through daily practice of virtuous actions.' },
  4: { name: 'Courage Badge', icon: '🦁', color: 'bg-amber-500', description: 'Face your fears and stand for truth even when it\'s difficult.' },
  5: { name: 'Discipline Badge', icon: '⏰', color: 'bg-orange-500', description: 'Build self-control and resilience through consistent habits.' },
  6: { name: 'Gratitude Badge', icon: '🙏', color: 'bg-green-500', description: 'Cultivate a thankful heart in all circumstances.' },
  7: { name: 'Purpose Badge', icon: '🌱', color: 'bg-indigo-500', description: 'Discover and pursue your unique mission and calling.' },
  8: { name: 'Service Badge', icon: '💪', color: 'bg-slate-800', description: 'Integrate all virtues to become your best self and guide others.' },
};

interface PageProps {
  params: {
    id: string;
  }
}

export default async function BadgePage({ params }: PageProps) {
  const badgeId = Number.parseInt(params.id, 10);
  
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