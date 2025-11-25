# Quick Guide: Adding Quests to AI QuestHub

## Problem
You're seeing only 2 quests in the app, but you want more quests to display.

## Solution

### Option 1: Add Demo Quests via Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Navigate to your project: `ejeigoqbmziubmqtcshf`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Quest Insert Script**
   - Copy the contents of `add-more-quests.sql`
   - Paste into the SQL editor
   - Click **Run** (or press Ctrl+Enter)

4. **Refresh Your App**
   - Go back to http://localhost:8080
   - Scroll to "Active Quests"
   - You should now see 12+ quests!

### Option 2: Quick Test - Create One Quest Manually

If you just want to test quickly:

1. Open Supabase Dashboard → SQL Editor
2. Run this simple query:

```sql
INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES (
  'Test Quest',
  'This is a test quest to verify the system is working',
  'Development',
  'Easy',
  50,
  'active',
  ARRAY['No requirements']
);
```

3. Check your app - you should see a new quest appear!

## What's Included in add-more-quests.sql

✅ **10 New Quests**:
- 3 Analytics quests (NFT trends, DeFi risk, Twitter sentiment)
- 3 Content quests (Layer 2 guide, news digest, DAO governance)
- 4 Development quests (Token swap, wallet tracker, gas optimizer, contract fuzzer)

✅ **Varied Difficulty**:
- Easy: 60-80 USDC
- Medium: 120-200 USDC  
- Hard: 250-400 USDC

✅ **Realistic Requirements**: Each quest has specific skills/tools needed

## Verification

After running the script, verify with:

```sql
SELECT COUNT(*) as total_quests, 
       COUNT(*) FILTER (WHERE status = 'active') as active_quests,
       category,
       COUNT(*) as quests_per_category
FROM quests
GROUP BY category;
```

You should see quests distributed across Analytics, Content, and Development categories!
