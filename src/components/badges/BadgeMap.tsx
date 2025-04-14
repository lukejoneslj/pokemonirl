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
      description: 'Master the art of meditation and mindfulness to cultivate inner peace.',
      icon: '🧘‍♂️',
      color: 'bg-blue-500',
      unlocked: isUnlocked(1),
      progress: getProgress(1),
    },
    {
      id: 2,
      name: 'Charity Badge',
      description: 'Serve others selflessly with acts of kindness and generosity.',
      icon: '❤️',
      color: 'bg-red-500',
      unlocked: isUnlocked(2),
      progress: getProgress(2),
    },
    {
      id: 3,
      name: 'Virtue Badge',
      description: 'Develop moral character through daily practice of virtuous actions.',
      icon: '⭐',
      color: 'bg-yellow-500',
      unlocked: isUnlocked(3),
      progress: getProgress(3),
    },
    {
      id: 4,
      name: 'Courage Badge',
      description: 'Face your fears and stand for truth even when it\'s difficult.',
      icon: '🦁',
      color: 'bg-amber-500',
      unlocked: isUnlocked(4),
      progress: getProgress(4),
    },
    {
      id: 5,
      name: 'Discipline Badge',
      description: 'Build self-control and resilience through consistent habits.',
      icon: '⏰',
      color: 'bg-orange-500',
      unlocked: isUnlocked(5),
      progress: getProgress(5),
    },
    {
      id: 6,
      name: 'Gratitude Badge',
      description: 'Cultivate a thankful heart in all circumstances.',
      icon: '🙏',
      color: 'bg-green-500',
      unlocked: isUnlocked(6),
      progress: getProgress(6),
    },
    {
      id: 7,
      name: 'Purpose Badge',
      description: 'Discover and pursue your unique mission and calling.',
      icon: '🌱',
      color: 'bg-indigo-500',
      unlocked: isUnlocked(7),
      progress: getProgress(7),
    },
    {
      id: 8,
      name: 'Light Badge',
      description: 'Integrate all virtues to become your best self and guide others.',
      icon: '💡',
      color: 'bg-slate-800',
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <Card 
            key={badge.id}
            className={`relative cursor-pointer transform transition-transform hover:scale-105 ${
              badge.unlocked ? 'border-2 border-yellow-400' : 'opacity-80'
            }`}
            onClick={() => setSelectedBadge(badge)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full ${badge.color} flex items-center justify-center mb-3 text-2xl`}>
                {badge.icon}
              </div>
              
              <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              
              <span className="text-xs text-gray-500 mt-1">
                {badge.progress}% Complete
              </span>
              
              {badge.unlocked && (
                <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">
                  Unlocked
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Badge detail dialog */}
      <Dialog open={!!selectedBadge} onOpenChange={(open) => !open && setSelectedBadge(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedBadge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-full ${selectedBadge.color} flex items-center justify-center text-lg`}>
                    {selectedBadge.icon}
                  </span>
                  {selectedBadge.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedBadge.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${selectedBadge.progress}%` }}
                  />
                </div>
                
                <p className="text-sm text-center">
                  {selectedBadge.progress}% Complete
                </p>
                
                <div className="pt-4">
                  <Button asChild className="w-full">
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
    </>
  );
} 