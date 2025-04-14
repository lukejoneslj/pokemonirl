# Supabase Database Setup for PokemonIRL

This guide will help you set up the necessary database tables and functions in Supabase for the PokemonIRL application to work correctly.

## Database Structure

The application requires the following tables:

1. `profiles` - User profiles
2. `challenge_progress` - Tracks user progress on individual challenges
3. `badge_progress` - Tracks user progress on badges

## Setup Instructions

### Option 1: Using the SQL Editor in Supabase Dashboard

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the `src/lib/supabase-setup.sql` file
4. Paste it into the SQL Editor
5. Run the SQL script

This will create all required tables, policies, and functions.

### Option 2: Setting up tables individually

If option 1 doesn't work, you can create the tables manually:

#### Create the profiles table

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);
```

#### Create the challenge_progress table

```sql
CREATE TABLE challenge_progress (
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

-- Enable RLS
ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own challenge progress" 
  ON challenge_progress FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own challenge progress" 
  ON challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own challenge progress" 
  ON challenge_progress FOR UPDATE USING (auth.uid() = user_id);
```

#### Create the badge_progress table

```sql
CREATE TABLE badge_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id INTEGER NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS
ALTER TABLE badge_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own badge progress" 
  ON badge_progress FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own badge progress" 
  ON badge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own badge progress" 
  ON badge_progress FOR UPDATE USING (auth.uid() = user_id);
```

## Troubleshooting

If you're encountering issues with the application:

1. Check the browser console for error messages
2. Verify that all tables exist in your Supabase database
3. Make sure Row Level Security (RLS) policies are correctly set up
4. Confirm that the user has the necessary permissions

For detailed error information, the application logs errors to the console when something goes wrong. 