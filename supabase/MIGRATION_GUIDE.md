# Database Migration Guide

## Overview

This guide explains how to apply the database fixes to your Supabase instance.

## Prerequisites

- Access to your Supabase project dashboard
- SQL Editor permissions

## Migration Files Created

1. `20251125_fix_user_creation.sql` - Fixes user signup trigger
2. `20251125_add_rls_policies.sql` - Adds missing security policies
3. `20251125_add_indexes.sql` - Adds performance indexes
4. `20251125_add_constraints.sql` - Adds data integrity constraints
5. `20251125_fix_storage.sql` - Fixes avatar storage permissions

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the content of each migration file **in order**:
   - Start with `20251125_fix_user_creation.sql`
   - Then `20251125_add_rls_policies.sql`
   - Then `20251125_add_indexes.sql`
   - Then `20251125_add_constraints.sql`
   - Finally `20251125_fix_storage.sql`
5. Click **Run** for each migration
6. Verify no errors appear

### Option 2: Supabase CLI

If you have Supabase CLI installed locally:

```bash
# Navigate to project directory
cd c:\Users\GREATNESS\Downloads\Compressed\agent-bounty-verse-main\agent-bounty-verse-main

# Link to your Supabase project (first time only)
supabase link --project-ref YOUR_PROJECT_REF

# Apply all pending migrations
supabase db push
```

## Verification

After applying migrations, run the diagnostic script:

1. Open SQL Editor in Supabase dashboard
2. Copy content from `diagnose-signup-error.sql`
3. Run the script
4. Verify:
   - ✅ `profiles` table exists
   - ✅ `on_auth_user_created` trigger exists  
   - ✅ `handle_new_user` function exists
   - ✅ All indexes are created
   - ✅ All policies are in place

## Test the Fixes

1. **Test User Signup**:
   - Try creating a new account
   - Verify profile is created automatically
   - Check username is assigned correctly

2. **Test Quest Operations**:
   - Create a quest
   - Accept a quest
   - Complete a quest
   - Delete your own quest

3. **Test Avatar Upload**:
   - Go to Profile page
   - Upload an avatar image
   - Verify it appears correctly

## Troubleshooting

### If migrations fail:

1. Check if you have the correct permissions
2. Ensure you're running migrations in the correct order  
3. Check for existing conflicting policies or indexes
4. Review the error message in SQL Editor

### Common issues:

- **"relation already exists"**: Migration was partially applied, safe to continue
- **"permission denied"**: You need owner/admin access to the database
- **"function does not exist"**: Apply migrations in the correct order

## Rollback (If Needed)

If you need to rollback changes, you can:

1. Drop the newly created indexes
2. Drop the new policies
3. Restore the original `handle_new_user()` function from the first migration file

## Need Help?

If you encounter issues:
1. Check the Supabase logs in Dashboard > Logs
2. Review the diagnostic script output
3. Ensure all environment variables are set correctly in `.env`
