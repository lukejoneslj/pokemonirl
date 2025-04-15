'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Challenge type mappings for icons and colors
const CHALLENGE_TYPES = {
  study: { icon: '📚', label: 'Study', color: 'bg-blue-100 text-blue-800' },
  reflect: { icon: '✍️', label: 'Reflect', color: 'bg-purple-100 text-purple-800' },
  roleplay: { icon: '🎭', label: 'Practice', color: 'bg-green-100 text-green-800' },
  apply: { icon: '🚀', label: 'Apply', color: 'bg-orange-100 text-orange-800' },
  boss: { icon: '👑', label: 'Gym Leader', color: 'bg-red-100 text-red-800' },
};

// Trainer background narratives for dialog
const TRAINER_BACKGROUNDS = {
  study: "This trainer is a master of knowledge, dedicated to the pursuit of wisdom. They believe that true growth begins with understanding.",
  reflect: "This mentor guides you to look within. Through thoughtful questions, they help you discover truths about yourself you might have overlooked.",
  roleplay: "A believer in practical learning, this trainer creates controlled scenarios for you to practice your newfound knowledge before applying it in the real world.",
  apply: "This trainer pushes you to take action. They know that true mastery comes from applying what you've learned in real-life situations.",
  boss: "The final test. This master will challenge you to demonstrate true mastery and commitment to your personal growth journey."
};

interface Challenge {
  id: number;
  type: 'study' | 'reflect' | 'roleplay' | 'apply' | 'boss';
  title: string;
  description: string;
  completed: boolean;
  trainerPath?: string;
}

interface BadgeChallengeProps {
  challenge: Challenge;
  step: number;
  userId: string;
  badgeId: number;
  isLocked: boolean;
}

export default function BadgeChallenge({ 
  challenge, 
  step, 
  userId, 
  badgeId,
  isLocked 
}: BadgeChallengeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(challenge.completed);
  
  const typeInfo = CHALLENGE_TYPES[challenge.type];
  
  const handleMarkComplete = async () => {
    if (isLocked) return;
    
    try {
      setIsLoading(true);
      
      // First, ensure the tables exist by checking the schema
      const { data: schema, error: schemaError } = await supabase
        .rpc('get_schema_info');
      
      console.log('Schema info:', schema);
      
      if (schemaError) {
        console.error('Schema check error:', schemaError);
      }
      
      // Simplified approach - directly try the upsert without prior checks
      const { data, error } = await supabase
        .from('challenge_progress')
        .upsert({
          user_id: userId,
          badge_id: badgeId,
          challenge_id: challenge.id,
          completed: true,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,badge_id,challenge_id'
        });
      
      console.log('Upsert response:', { data, error });
      
      if (error) {
        console.error('Complete error object:', error);
        
        // If table doesn't exist, try to create it
        if (error.code === '42P01') { // PostgreSQL code for undefined_table
          console.log('Table does not exist, attempting to create it');
          
          // Create the tables if they don't exist
          await createTablesIfNeeded();
          
          // Try the upsert again
          const { error: retryError } = await supabase
            .from('challenge_progress')
            .upsert({
              user_id: userId,
              badge_id: badgeId,
              challenge_id: challenge.id,
              completed: true,
              completed_at: new Date().toISOString(),
            }, {
              onConflict: 'user_id,badge_id,challenge_id'
            });
            
          if (retryError) {
            throw new Error(`Failed to create and update: ${JSON.stringify(retryError)}`);
          }
        } else {
          throw new Error(`Supabase error: ${JSON.stringify(error)}`);
        }
      }
      
      // Update badge progress
      try {
        await updateBadgeProgress();
      } catch (progressError) {
        console.error('Progress update error:', progressError);
        // Continue even if badge progress update fails
      }
      
      setIsCompleted(true);
      router.refresh();
    } catch (error) {
      console.error('Error marking challenge as complete:', error instanceof Error ? error.message : JSON.stringify(error));
      console.error('Full error object:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateBadgeProgress = async () => {
    try {
      // Get total number of challenges for this badge (fixed at 5 per badge)
      const totalChallenges = 5;
      
      // Get completed challenges - simplified query
      const { data: completedChallenges, error: fetchError } = await supabase
        .from('challenge_progress')
        .select('challenge_id')
        .eq('user_id', userId)
        .eq('badge_id', badgeId)
        .eq('completed', true);
      
      if (fetchError) {
        console.error('Fetch challenges error:', fetchError);
        
        // If the table doesn't exist, try to create it first
        if (fetchError.code === '42P01') {
          await createTablesIfNeeded();
          return; // Exit early after creating tables
        }
        
        throw fetchError;
      }
      
      // Calculate progress percentage
      const completedCount = completedChallenges?.length || 0;
      const progressPercentage = Math.round((completedCount / totalChallenges) * 100);
      
      console.log('Badge progress update:', {
        user_id: userId,
        badge_id: badgeId,
        progress_percentage: progressPercentage,
        completed: progressPercentage === 100
      });
      
      // Simple upsert without additional checking
      const { error: updateError } = await supabase
        .from('badge_progress')
        .upsert({
          user_id: userId,
          badge_id: badgeId,
          progress_percentage: progressPercentage,
          completed: progressPercentage === 100,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,badge_id'
        });
      
      if (updateError) {
        console.error('Badge progress update error:', updateError);
      }
    } catch (error) {
      console.error('Progress tracking error:', error);
    }
  };
  
  // Function to create tables if needed
  const createTablesIfNeeded = async () => {
    console.log('Attempting to create tables...');
    
    // Try using RPC functions first
    try {
      // Create challenge_progress table
      const { error: challengeError } = await supabase.rpc('create_challenge_progress_table');
      if (challengeError) {
        console.error('Error creating challenge_progress table via RPC:', challengeError);
        // If RPC fails, we'll try direct SQL in the catch block
        throw challengeError;
      }
      
      // Create badge_progress table
      const { error: badgeError } = await supabase.rpc('create_badge_progress_table');
      if (badgeError) {
        console.error('Error creating badge_progress table via RPC:', badgeError);
        throw badgeError;
      }
      
      console.log('Tables created successfully via RPC functions');
    } catch (error) {
      console.error('RPC approach failed, using direct upsert method as fallback');
      
      // Just try to directly upsert the records and let Supabase handle errors
      // This is a fallback approach that might work if permissions allow it
      console.log('Attempting direct inserts as fallback...');
      
      try {
        // Try to directly insert the challenge progress record
        const { error: insertError } = await supabase
          .from('challenge_progress')
          .upsert({
            user_id: userId,
            badge_id: badgeId,
            challenge_id: challenge.id,
            completed: true,
            completed_at: new Date().toISOString(),
          }, { 
            onConflict: 'user_id,badge_id,challenge_id'
          });
          
        if (insertError) {
          console.error('Direct challenge insert failed:', insertError);
        } else {
          console.log('Direct challenge insert succeeded');
        }
        
        // Try to directly insert badge progress
        const { error: badgeInsertError } = await supabase
          .from('badge_progress')
          .upsert({
            user_id: userId,
            badge_id: badgeId,
            progress_percentage: 20, // Default progress for first challenge
            completed: false,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,badge_id'
          });
          
        if (badgeInsertError) {
          console.error('Direct badge insert failed:', badgeInsertError);
        } else {
          console.log('Direct badge insert succeeded');
        }
      } catch (fallbackError) {
        console.error('Fallback approach also failed:', fallbackError);
      }
    }
  };
  
  return (
    <>
      <Card 
        className={`
          border-l-4 
          ${isCompleted ? 'border-l-green-500' : isLocked ? 'border-l-gray-300 opacity-60' : 'border-l-blue-500'}
          ${!isLocked && !isCompleted && challenge.trainerPath ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
        `}
        onClick={() => {
          if (isLocked) return;
          if (challenge.trainerPath) {
            router.push(challenge.trainerPath);
          }
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-lg">
                {step}
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={typeInfo.color}>
                  <span className="mr-1">{typeInfo.icon}</span> {typeInfo.label}
                </Badge>
                
                {isCompleted && (
                  <Badge className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-1">{challenge.title}</h3>
              <p className="text-gray-600 mb-4">{challenge.description.split('"')[0]}</p>
              
              <div className="flex justify-between">
                {challenge.trainerPath && (
                  <Button 
                    variant="outline" 
                    asChild 
                    disabled={isLocked}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href={challenge.trainerPath}>
                      Challenge Trainer
                    </Link>
                  </Button>
                )}
                
                <Button
                  variant={isCompleted ? "outline" : "default"}
                  disabled={isLoading || isLocked || isCompleted}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkComplete();
                  }}
                  className={isCompleted ? "text-green-600 border-green-300" : ""}
                >
                  {isLoading ? 'Saving...' : isCompleted ? '✓ Completed' : 'Mark as Complete'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
} 