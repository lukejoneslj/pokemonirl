-- First, ensure all required tables exist
-- Create the profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles if needed
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create the challenge_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  badge_id INTEGER NOT NULL,
  challenge_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id, challenge_id)
);

-- Enable RLS on challenge_progress if needed
ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;

-- Create the badge_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS badge_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  badge_id INTEGER NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS on badge_progress if needed
ALTER TABLE badge_progress ENABLE ROW LEVEL SECURITY;

-- Now fix the policies
DO $$
BEGIN
    -- Drop existing policies (ignoring errors if they don't exist)
    BEGIN
        DROP POLICY IF EXISTS "Users can view their own challenge progress" ON challenge_progress;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error dropping policy: %', SQLERRM;
    END;
    
    BEGIN
        DROP POLICY IF EXISTS "Users can update their own challenge progress" ON challenge_progress;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error dropping policy: %', SQLERRM;
    END;
    
    BEGIN
        DROP POLICY IF EXISTS "Users can insert their own challenge progress" ON challenge_progress;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error dropping policy: %', SQLERRM;
    END;
    
    -- Recreate policies with unique names
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'challenge_progress_select' AND tablename = 'challenge_progress') THEN
        CREATE POLICY "challenge_progress_select" 
            ON challenge_progress FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'challenge_progress_insert' AND tablename = 'challenge_progress') THEN
        CREATE POLICY "challenge_progress_insert" 
            ON challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'challenge_progress_update' AND tablename = 'challenge_progress') THEN
        CREATE POLICY "challenge_progress_update" 
            ON challenge_progress FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    -- Add basic policies for badge_progress too
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'badge_progress_select' AND tablename = 'badge_progress') THEN
        CREATE POLICY "badge_progress_select" 
            ON badge_progress FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'badge_progress_insert' AND tablename = 'badge_progress') THEN
        CREATE POLICY "badge_progress_insert" 
            ON badge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'badge_progress_update' AND tablename = 'badge_progress') THEN
        CREATE POLICY "badge_progress_update" 
            ON badge_progress FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Also update the get_schema_info function to include more detailed info for debugging
CREATE OR REPLACE FUNCTION get_schema_info()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  schema_info JSONB;
BEGIN
  SELECT jsonb_build_object(
    'tables', (
      SELECT jsonb_agg(tablename)
      FROM pg_tables
      WHERE schemaname = 'public'
    ),
    'policies', (
      SELECT jsonb_agg(jsonb_build_object(
        'name', policyname,
        'table', tablename,
        'action', cmd
      ))
      FROM pg_policies
      WHERE schemaname = 'public'
    ),
    'functions', (
      SELECT jsonb_agg(proname)
      FROM pg_proc
      JOIN pg_namespace ON pg_namespace.oid = pg_proc.pronamespace
      WHERE nspname = 'public'
    )
  ) INTO schema_info;
  
  RETURN schema_info;
END;
$$;

-- Functions for creating tables when needed
CREATE OR REPLACE FUNCTION create_challenge_progress_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'challenge_progress') THEN
    CREATE TABLE challenge_progress (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES auth.users ON DELETE CASCADE,
      badge_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      completed_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, badge_id, challenge_id)
    );
    
    -- Enable RLS
    ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "CP Select Policy" 
      ON challenge_progress FOR SELECT USING (auth.uid() = user_id);
      
    CREATE POLICY "CP Insert Policy" 
      ON challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
      
    CREATE POLICY "CP Update Policy" 
      ON challenge_progress FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION create_badge_progress_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'badge_progress') THEN
    CREATE TABLE badge_progress (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES auth.users ON DELETE CASCADE,
      badge_id INTEGER NOT NULL,
      progress_percentage INTEGER DEFAULT 0,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, badge_id)
    );
    
    -- Enable RLS
    ALTER TABLE badge_progress ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "BP Select Policy" 
      ON badge_progress FOR SELECT USING (auth.uid() = user_id);
      
    CREATE POLICY "BP Insert Policy" 
      ON badge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
      
    CREATE POLICY "BP Update Policy" 
      ON badge_progress FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END;
$$; 