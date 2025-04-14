-- Fix RLS policies for challenge_progress table
BEGIN;

-- First, check if the table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'challenge_progress') THEN
    -- Drop existing policies to start fresh
    DROP POLICY IF EXISTS "Users can view their own challenge progress" ON challenge_progress;
    DROP POLICY IF EXISTS "Users can insert their own challenge progress" ON challenge_progress;
    DROP POLICY IF EXISTS "Users can update their own challenge progress" ON challenge_progress;
    DROP POLICY IF EXISTS "challenge_progress_select" ON challenge_progress;
    DROP POLICY IF EXISTS "challenge_progress_insert" ON challenge_progress;
    DROP POLICY IF EXISTS "challenge_progress_update" ON challenge_progress;
    DROP POLICY IF EXISTS "CP Select Policy" ON challenge_progress;
    DROP POLICY IF EXISTS "CP Insert Policy" ON challenge_progress;
    DROP POLICY IF EXISTS "CP Update Policy" ON challenge_progress;
    
    -- Create better policies with correct permissions
    CREATE POLICY "enable_all_for_users"
      ON challenge_progress
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
      
    -- Temporarily disable RLS for debugging if needed
    -- ALTER TABLE challenge_progress DISABLE ROW LEVEL SECURITY;
    
    -- Allow all users to use the table (temporary for debugging)
    -- ALTER TABLE challenge_progress FORCE ROW LEVEL SECURITY;
    
    RAISE NOTICE 'Challenge progress policies updated successfully';
  ELSE
    RAISE NOTICE 'challenge_progress table does not exist';
  END IF;
END $$;

-- Fix RLS policies for badge_progress table
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'badge_progress') THEN
    -- Drop existing policies to start fresh
    DROP POLICY IF EXISTS "Users can view their own badge progress" ON badge_progress;
    DROP POLICY IF EXISTS "Users can insert their own badge progress" ON badge_progress;
    DROP POLICY IF EXISTS "Users can update their own badge progress" ON badge_progress;
    DROP POLICY IF EXISTS "badge_progress_select" ON badge_progress;
    DROP POLICY IF EXISTS "badge_progress_insert" ON badge_progress;
    DROP POLICY IF EXISTS "badge_progress_update" ON badge_progress;
    DROP POLICY IF EXISTS "BP Select Policy" ON badge_progress;
    DROP POLICY IF EXISTS "BP Insert Policy" ON badge_progress;
    DROP POLICY IF EXISTS "BP Update Policy" ON badge_progress;
    
    -- Create better policies with correct permissions
    CREATE POLICY "enable_all_for_users"
      ON badge_progress
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
      
    RAISE NOTICE 'Badge progress policies updated successfully';
  ELSE
    RAISE NOTICE 'badge_progress table does not exist';
  END IF;
END $$;

-- Fix profiles table RLS if needed
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    -- Create a more permissive profile policy if needed
    DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
    
    CREATE POLICY "enable_all_for_users"
      ON profiles
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
      
    RAISE NOTICE 'Profile policies updated successfully';
  ELSE
    RAISE NOTICE 'profiles table does not exist';
  END IF;
END $$;

-- Add a foreign key reference if it's missing
DO $$
BEGIN
  -- Check if the challenge_progress references profiles table for user_id
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name = 'challenge_progress'
      AND column_name = 'user_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.key_column_usage
    WHERE table_schema = 'public'
      AND table_name = 'challenge_progress'
      AND column_name = 'user_id'
      AND constraint_name LIKE '%_fkey'
  ) THEN
    -- Try to modify the foreign key reference to use auth.users directly
    ALTER TABLE challenge_progress 
    DROP CONSTRAINT IF EXISTS challenge_progress_user_id_fkey;
    
    ALTER TABLE challenge_progress
    ALTER COLUMN user_id TYPE UUID;
    
    -- Add foreign key reference to auth.users instead of profiles
    ALTER TABLE challenge_progress
    ADD CONSTRAINT challenge_progress_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    
    RAISE NOTICE 'challenge_progress foreign key updated';
  END IF;

  -- Same for badge_progress
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name = 'badge_progress'
      AND column_name = 'user_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.key_column_usage
    WHERE table_schema = 'public'
      AND table_name = 'badge_progress'
      AND column_name = 'user_id'
      AND constraint_name LIKE '%_fkey'
  ) THEN
    -- Try to modify the foreign key reference
    ALTER TABLE badge_progress 
    DROP CONSTRAINT IF EXISTS badge_progress_user_id_fkey;
    
    ALTER TABLE badge_progress
    ALTER COLUMN user_id TYPE UUID;
    
    -- Add foreign key reference to auth.users directly
    ALTER TABLE badge_progress
    ADD CONSTRAINT badge_progress_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    
    RAISE NOTICE 'badge_progress foreign key updated';
  END IF;
END $$;

-- Example user check query
SELECT 
  'Current user' as check_type,
  auth.uid() as current_user;
  
-- Check table permissions
SELECT 
  table_name,
  has_table_privilege(current_user, table_name, 'SELECT') as can_select,
  has_table_privilege(current_user, table_name, 'INSERT') as can_insert,
  has_table_privilege(current_user, table_name, 'UPDATE') as can_update
FROM 
  information_schema.tables
WHERE 
  table_schema = 'public' AND
  table_name IN ('profiles', 'challenge_progress', 'badge_progress');

COMMIT; 