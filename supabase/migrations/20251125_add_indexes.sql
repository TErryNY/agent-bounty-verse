-- Add performance indexes for frequently queried columns
-- Migration: 20251125_add_indexes.sql

-- Index for filtering quests by status (very common query)
CREATE INDEX IF NOT EXISTS idx_quests_status 
  ON public.quests(status);

-- Index for filtering quests by category
CREATE INDEX IF NOT EXISTS idx_quests_category 
  ON public.quests(category);

-- Index for filtering quests by difficulty
CREATE INDEX IF NOT EXISTS idx_quests_difficulty 
  ON public.quests(difficulty);

-- Index for finding quests created by a user
CREATE INDEX IF NOT EXISTS idx_quests_created_by 
  ON public.quests(created_by);

-- Index for quest creation date ordering (used in list queries)
CREATE INDEX IF NOT EXISTS idx_quests_created_at 
  ON public.quests(created_at DESC);

-- Index for user progress queries by user
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id 
  ON public.user_progress(user_id);

-- Index for user progress queries by quest
CREATE INDEX IF NOT EXISTS idx_user_progress_quest_id 
  ON public.user_progress(quest_id);

-- Index for user progress status filtering
CREATE INDEX IF NOT EXISTS idx_user_progress_status 
  ON public.user_progress(status);

-- Composite index for user's quest progress lookup (most common query)
CREATE INDEX IF NOT EXISTS idx_user_progress_user_quest 
  ON public.user_progress(user_id, quest_id);

-- Index for notifications by user_id (real-time queries)
CREATE INDEX IF NOT EXISTS idx_notifications_user_id 
  ON public.notifications(user_id);

-- Index for unread notifications
CREATE INDEX IF NOT EXISTS idx_notifications_read 
  ON public.notifications(user_id, read) 
  WHERE read = false;

-- Index for notification created_at ordering
CREATE INDEX IF NOT EXISTS idx_notifications_created_at 
  ON public.notifications(user_id, created_at DESC);

-- Index for profiles by username (for username lookups during signup)
CREATE INDEX IF NOT EXISTS idx_profiles_username 
  ON public.profiles(username);

-- Index for profiles by total_points (for leaderboard queries)
CREATE INDEX IF NOT EXISTS idx_profiles_total_points 
  ON public.profiles(total_points DESC);

-- Analyze tables to update statistics after creating indexes
ANALYZE public.quests;
ANALYZE public.user_progress;
ANALYZE public.notifications;
ANALYZE public.profiles;
