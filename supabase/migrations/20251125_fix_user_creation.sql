-- Fix user creation trigger to handle conflicts and edge cases
-- Migration: 20251125_fix_user_creation.sql

-- Drop existing function first
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  generated_username TEXT;
  attempt_count INTEGER := 0;
  max_attempts INTEGER := 5;
BEGIN
  -- Start with provided username or derive from email
  generated_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1)
  );
  
  -- Remove invalid characters and ensure it's not empty
  generated_username := regexp_replace(generated_username, '[^a-zA-Z0-9_]', '', 'g');
  
  -- If username becomes empty after cleanup, use a default
  IF generated_username = '' OR generated_username IS NULL THEN
    generated_username := 'user';
  END IF;
  
  -- Ensure minimum length
  IF length(generated_username) < 3 THEN
    generated_username := generated_username || '_' || substring(NEW.id::text, 1, 6);
  END IF;
  
  -- Try to insert profile with conflict resolution
  LOOP
    BEGIN
      INSERT INTO public.profiles (id, username, avatar_url)
      VALUES (
        NEW.id,
        generated_username,
        NEW.raw_user_meta_data->>'avatar_url'
      );
      
      -- If successful, exit loop
      EXIT;
      
    EXCEPTION WHEN unique_violation THEN
      -- Username already exists, append number and retry
      attempt_count := attempt_count + 1;
      
      IF attempt_count >= max_attempts THEN
        -- After max attempts, use UUID suffix
        generated_username := split_part(NEW.email, '@', 1) || '_' || substring(NEW.id::text, 1, 8);
        
        -- One final attempt
        INSERT INTO public.profiles (id, username, avatar_url)
        VALUES (
          NEW.id,
          generated_username,
          NEW.raw_user_meta_data->>'avatar_url'
        )
        ON CONFLICT (username) DO UPDATE
        SET username = EXCLUDED.username || '_' || substring(md5(random()::text), 1, 4);
        
        EXIT;
      ELSE
        -- Try with a number suffix
        generated_username := regexp_replace(generated_username, '_\d+$', '') || '_' || attempt_count::text;
      END IF;
    END;
  END LOOP;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add comment for documentation
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a profile when a new user signs up. Handles username conflicts gracefully.';
