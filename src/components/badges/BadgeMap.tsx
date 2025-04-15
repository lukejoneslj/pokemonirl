'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Define badge types
interface BadgeData {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  unlocked: boolean;
  progress: number;
}

// Define badge progress type from database
interface BadgeProgress {
  id: string;
  user_id: string;
  badge_id: number;
  completed: boolean;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

interface BadgeMapProps {
  badgeProgress: BadgeProgress[];
  userId: string;
}

export default function BadgeMap({ badgeProgress, userId }: BadgeMapProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);
  
  // This would be fetched from the database in a real app
  const badges: BadgeData[] = [
    {
      id: 1,
      name: 'Stillness Badge',
      description: 'Cultivate inner calm, mindfulness, and presence through meditation, prayer, and focused attention.',
      icon: '🧘‍♂️',
      color: 'bg-blue-500',
      bgColor: 'from-blue-500 to-blue-400',
      unlocked: isUnlocked(1),
      progress: getProgress(1),
    },
    {
      id: 2,
      name: 'Charity Badge',
      description: 'Serve others selflessly with acts of kindness and generosity.',
      icon: '❤️',
      color: 'bg-red-500',
      bgColor: 'from-red-500 to-red-400',
      unlocked: isUnlocked(2),
      progress: getProgress(2),
    },
    {
      id: 3,
      name: 'Virtue Badge',
      description: 'Develop moral character through daily practice of virtuous actions.',
      icon: '⭐',
      color: 'bg-yellow-500',
      bgColor: 'from-yellow-500 to-yellow-400',
      unlocked: isUnlocked(3),
      progress: getProgress(3),
    },
    {
      id: 4,
      name: 'Courage Badge',
      description: 'Face your fears and stand for truth even when it\'s difficult.',
      icon: '🦁',
      color: 'bg-amber-500',
      bgColor: 'from-amber-500 to-amber-400',
      unlocked: isUnlocked(4),
      progress: getProgress(4),
    },
    {
      id: 5,
      name: 'Discipline Badge',
      description: 'Build self-control and resilience through consistent habits.',
      icon: '⏰',
      color: 'bg-orange-500',
      bgColor: 'from-orange-500 to-orange-400',
      unlocked: isUnlocked(5),
      progress: getProgress(5),
    },
    {
      id: 6,
      name: 'Gratitude Badge',
      description: 'Cultivate a thankful heart in all circumstances.',
      icon: '🙏',
      color: 'bg-green-500',
      bgColor: 'from-green-500 to-green-400',
      unlocked: isUnlocked(6),
      progress: getProgress(6),
    },
    {
      id: 7,
      name: 'Purpose Badge',
      description: 'Discover and pursue your unique mission and calling.',
      icon: '🌱',
      color: 'bg-indigo-500',
      bgColor: 'from-indigo-500 to-indigo-400',
      unlocked: isUnlocked(7),
      progress: getProgress(7),
    },
    {
      id: 8,
      name: 'Light Badge',
      description: 'Integrate all virtues to become your best self and guide others.',
      icon: '💡',
      color: 'bg-slate-800',
      bgColor: 'from-slate-800 to-slate-700',
      unlocked: isUnlocked(8),
      progress: getProgress(8),
    },
  ];

  // Helper function to check if a badge is unlocked
  function isUnlocked(badgeId: number): boolean {
    return badgeProgress.some(bp => bp.badge_id === badgeId && bp.completed);
  }
  
  // Helper function to get progress percentage
  function getProgress(badgeId: number): number {
    const progress = badgeProgress.find(bp => bp.badge_id === badgeId);
    return progress?.progress_percentage || 0;
  }
  
  // Helper function to get badge by ID
  function getBadgeById(badgeId: number): BadgeData | undefined {
    return badges.find(badge => badge.id === badgeId);
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md relative">
        {/* Pokemon-themed decorative elements instead of grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-10">
          <div className="absolute top-10 right-10 w-24 h-24 rounded-full border-4 border-red-500" />
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full border-4 border-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">Gym Badge Map</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {badges.map((badge) => (
            <Card 
              key={badge.id}
              className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                badge.unlocked ? 'border-2 border-yellow-400 bg-white' : 'bg-white border border-slate-200'
              }`}
              onClick={() => setSelectedBadge(badge)}
            >
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${badge.bgColor} mt-2 mb-3 transform rotate-45 rounded-sm relative ${
                  badge.unlocked ? 'shadow-md' : ''
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                  {badge.unlocked && (
                    <div className="absolute -right-1 -top-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md -rotate-45">
                      <span className="text-xs text-black font-bold rotate-45">✓</span>
                    </div>
                  )}
                </div>
                
                <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
                
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${badge.unlocked ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between w-full mt-1">
                  <span className="text-xs text-gray-500">
                    Level {Math.ceil(badge.progress / 20)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {badge.progress}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Badge detail dialog */}
      <Dialog open={!!selectedBadge} onOpenChange={(open) => !open && setSelectedBadge(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedBadge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <div className={`w-10 h-10 bg-gradient-to-br ${selectedBadge.bgColor} rounded-sm transform rotate-45 flex items-center justify-center`}>
                    <span className="text-xl -rotate-45">{selectedBadge.icon}</span>
                  </div>
                  <span>{selectedBadge.name}</span>
                  {selectedBadge.unlocked && (
                    <Badge className="bg-yellow-400 text-black ml-auto">Earned</Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="mt-2">
                  {selectedBadge.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {/* XP bar themed like Pokemon */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{selectedBadge.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 mb-3 overflow-hidden border border-slate-300">
                    <div 
                      className={`h-full rounded-full ${selectedBadge.unlocked ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                      style={{ width: `${selectedBadge.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Level {Math.ceil(selectedBadge.progress / 20)}</span>
                    <span>Level {Math.min(5, Math.ceil(selectedBadge.progress / 20) + 1)}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button asChild className={`w-full font-bold ${
                    selectedBadge.unlocked 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}>
                    <Link href={`/badges/${selectedBadge.id}`}>
                      {selectedBadge.unlocked ? 'Continue Training' : 'Start Challenge'}
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 