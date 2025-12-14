-- Manual Migration: Add logoPath column to Settings table
-- Run this in your Supabase SQL Editor

-- Step 1: Add the logoPath column
ALTER TABLE "Settings" 
ADD COLUMN IF NOT EXISTS "logoPath" TEXT NOT NULL DEFAULT '/logo.png';

-- Step 2: Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'Settings' AND column_name = 'logoPath';
