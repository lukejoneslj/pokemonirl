import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 p-4 text-white">
      <div className="max-w-3xl text-center space-y-6">
        <div className="space-y-2">
          <Badge className="px-3 py-1 text-sm bg-yellow-400 text-gray-900 hover:bg-yellow-500">Beta Version</Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Become Your Best Self with <span className="text-yellow-300">PokemonIRL</span>
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-blue-100">
            Complete real-life gym badge challenges to grow and transform
          </p>
        </div>
        
        <div className="py-4">
          <p className="text-lg">
            Inspired by Pokémon's gym badge journey, but focused on personal growth,
            spiritual development, and becoming the best version of yourself.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold text-lg px-8 py-6"
          >
            <Link href="/auth">Start Your Journey</Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-6"
          >
            <Link href="#learn-more">Learn More</Link>
          </Button>
        </div>
      </div>
      
      <div id="learn-more" className="max-w-4xl mx-auto mt-24 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">8 Badges of Growth</h2>
            <p>Just like Pokémon gyms, progress through 8 unique badges, each focused on a different area of personal development.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Progressive Challenges</h2>
            <p>Each badge has multiple levels to complete - study, reflect, roleplay, apply, and master a final challenge.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
            <p>See your journey unfold as you complete challenges and earn badges on your path to self-mastery.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Build Better Habits</h2>
            <p>Transform your life through gamified challenges that develop virtues and positive habits.</p>
          </div>
        </div>
        
        <div className="text-center pt-8">
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold text-lg px-8 py-6"
          >
            <Link href="/auth">Begin Your Journey Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
