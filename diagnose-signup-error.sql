-- DIAGNOSIS SCRIPT FOR SIGN-UP ERRORS
-- Run this in your Supabase SQL Editor to check database setup

-- 1. Check if profiles table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'profiles'
) AS profiles_table_exists;

-- 2. Check if the trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 3. Check if the function exists
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'handle_new_user';

-- 4. View existing profiles (check for duplicates)
SELECT id, username, created_at 
FROM public.profiles 
ORDER BY created_at DESC 
LIMIT 10;

-- 5. Check auth.users table
SELECT id, email, created_at, raw_user_meta_data->>'username' as username
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;
