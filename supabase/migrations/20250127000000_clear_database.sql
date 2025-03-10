/*
  # Clear database data

  1. Changes
    - Clear all data from videos table
    - Clear all data from comments table
    - Clear all data from anonymous_likes table
    - Clear all data from video_likes table
    - Reset sequence counters

  2. Security
    - Preserve all existing policies and permissions
    - Maintain table structures and relationships
*/

-- Clear all data while preserving table structure
TRUNCATE TABLE comments CASCADE;
TRUNCATE TABLE anonymous_likes CASCADE;
TRUNCCATE TABLE video_likes CASCADE;
TRUNCATE TABLE videos CASCADE;

-- Reset the likes_count and views_count on videos table
UPDATE videos SET likes_count = 0, views_count = 0;