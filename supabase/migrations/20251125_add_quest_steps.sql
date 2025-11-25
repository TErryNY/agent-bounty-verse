-- Add quest step tracking to user_progress table
-- Run this migration in Supabase SQL Editor

-- Add steps_completed column to track user progress through quest steps
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS steps_completed JSONB DEFAULT '[]'::jsonb;

-- Add comment explaining the column
COMMENT ON COLUMN user_progress.steps_completed IS 
'Array of completed step indices. Example: [0, 1, 3] means steps 0, 1, and 3 are complete. Used by quest walkthrough to persist user progress.';

-- Add optional quest_steps column to quests table for predefined steps
ALTER TABLE quests
ADD COLUMN IF NOT EXISTS quest_steps JSONB DEFAULT NULL;

-- Add comment explaining the column
COMMENT ON COLUMN quests.quest_steps IS 
'Optional predefined walkthrough steps as JSON array. If null, steps are auto-generated from requirements array. Format: [{"title": "Step 1", "description": "Do this", "resources": ["link1"]}]';

-- Create index for faster queries on steps_completed
CREATE INDEX IF NOT EXISTS idx_user_progress_steps_completed 
ON user_progress USING GIN (steps_completed);

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'user_progress' 
AND column_name IN ('steps_completed')
ORDER BY ordinal_position;
