-- Temporarily disable RLS on all tables for debugging
-- WARNING: Only use this in development, never in production!

-- Disable RLS on challenge_progress
ALTER TABLE IF EXISTS challenge_progress DISABLE ROW LEVEL SECURITY;

-- Disable RLS on badge_progress
ALTER TABLE IF EXISTS badge_progress DISABLE ROW LEVEL SECURITY;

-- Disable RLS on profiles
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;

-- Check RLS status on all tables
SELECT
    n.nspname as schema,
    c.relname as table,
    CASE WHEN c.relrowsecurity THEN 'RLS enabled' ELSE 'RLS disabled' END as rls_status
FROM
    pg_class c
JOIN
    pg_namespace n ON n.oid = c.relnamespace
WHERE
    c.relkind = 'r' AND
    n.nspname = 'public'; 