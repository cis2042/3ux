-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    creator TEXT NOT NULL,
    duration INTEGER,
    thumbnail_url TEXT,
    likes INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    article_url TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create video_likes table
CREATE TABLE IF NOT EXISTS video_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add some sample data
INSERT INTO videos (title, description, url, creator, thumbnail_url, duration, category) VALUES
('數位化轉型與使用者體驗', '這個案例探討數位化轉型過程中使用者體驗的重要性及其實施策略...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'UX3 Team', 'https://img.youtube.com/vi/ByqGPdtRmQU/hqdefault.jpg', 325, 'Case Study'),
('行動應用的無障礙設計原則', '本視頻討論如何在行動應用中實施無障礙設計，確保所有用戶都能夠使用...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Accessibility Design Lab', 'https://img.youtube.com/vi/gZWHG3lZBZo/hqdefault.jpg', 418, 'Accessibility'),
('情感設計如何提升產品體驗', '情感設計不僅僅是讓產品看起來漂亮，而是通過理解用戶情感來創造更有意義的體驗...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Emotional Design Studio', 'https://img.youtube.com/vi/qUiiiflrKkQ/hqdefault.jpg', 297, 'Design');
