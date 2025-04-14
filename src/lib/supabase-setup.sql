-- Table for user profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Table for challenge progress
CREATE TABLE IF NOT EXISTS challenge_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id INTEGER NOT NULL,
  challenge_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id, challenge_id)
);

-- Enable RLS on challenge_progress
ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;

-- Policies for challenge_progress
CREATE POLICY "Users can view their own challenge progress" 
  ON challenge_progress FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own challenge progress" 
  ON challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own challenge progress" 
  ON challenge_progress FOR UPDATE USING (auth.uid() = user_id);

-- Table for badge progress
CREATE TABLE IF NOT EXISTS badge_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id INTEGER NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS on badge_progress
ALTER TABLE badge_progress ENABLE ROW LEVEL SECURITY;

-- Policies for badge_progress
CREATE POLICY "Users can view their own badge progress" 
  ON badge_progress FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own badge progress" 
  ON badge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own badge progress" 
  ON badge_progress FOR UPDATE USING (auth.uid() = user_id);

-- Function to create challenge_progress table if it doesn't exist
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

-- Function to create badge_progress table if it doesn't exist
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

-- Function to get schema info
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
    )
  ) INTO schema_info;
  
  RETURN schema_info;
END;
$$; 