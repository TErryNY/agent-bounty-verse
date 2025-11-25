-- Add missing RLS policies for delete operations
-- Migration: 20251125_add_rls_policies.sql

-- Add DELETE policy for quests (only creator can delete)
CREATE POLICY "Users can delete own quests"
  ON public.quests FOR DELETE
  USING (auth.uid() = created_by);

-- Add DELETE policy for user_progress
CREATE POLICY "Users can delete own progress"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Add DELETE policy for notifications
CREATE POLICY "Users can delete own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- Add DELETE policy for notification_preferences  
CREATE POLICY "Users can delete own preferences"
  ON public.notification_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- Add policy to allow users to view all profiles (for leaderboard)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Ensure users can only update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
