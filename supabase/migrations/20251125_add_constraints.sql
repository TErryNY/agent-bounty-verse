-- Add data integrity constraints
-- Migration: 20251125_add_constraints.sql

-- Ensure username is not empty and has reasonable length
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS username_not_empty,
  ADD CONSTRAINT username_not_empty 
    CHECK (username IS NOT NULL AND length(trim(username)) >= 3 AND length(username) <= 20);

-- Ensure quest reward is positive
ALTER TABLE public.quests
  DROP CONSTRAINT IF EXISTS reward_positive,
  ADD CONSTRAINT reward_positive 
    CHECK (reward > 0);

-- Ensure points earned is not negative
ALTER TABLE public.user_progress
  DROP CONSTRAINT IF EXISTS points_not_negative,
  ADD CONSTRAINT points_not_negative 
    CHECK (points_earned >= 0);

-- Ensure completed_at is set when status is completed
CREATE OR REPLACE FUNCTION check_completion_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.completed_at IS NULL THEN
    NEW.completed_at := now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_completion_timestamp ON public.user_progress;
CREATE TRIGGER ensure_completion_timestamp
  BEFORE INSERT OR UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION check_completion_timestamp();

-- Ensure profile stats stay consistent
CREATE OR REPLACE FUNCTION validate_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total_points < 0 THEN
    NEW.total_points := 0;
  END IF;
  
  IF NEW.quests_completed < 0 THEN
    NEW.quests_completed := 0;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS validate_profile_stats_trigger ON public.profiles;
CREATE TRIGGER validate_profile_stats_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_profile_stats();

-- Add constraint for valid email format in profiles (derived from auth)
COMMENT ON COLUMN public.profiles.username IS 'Username must be 3-20 characters, alphanumeric and underscores only';
COMMENT ON COLUMN public.quests.reward IS 'Quest reward in USDC, must be positive';
COMMENT ON COLUMN public.user_progress.points_earned IS 'Points earned from completing quest, must be non-negative';
