-- 重命名列以匹配前端期望的格式
ALTER TABLE videos RENAME COLUMN upload_date TO uploadDate;
ALTER TABLE videos RENAME COLUMN thumbnail_url TO thumbnailUrl;
ALTER TABLE videos RENAME COLUMN article_url TO articleUrl;

-- 重新插入示例數據
TRUNCATE TABLE videos CASCADE;

INSERT INTO videos (title, description, url, uploadDate, creator, thumbnailUrl, duration, category, views_count, likes) VALUES
('數位化轉型與使用者體驗', '這個案例探討數位化轉型過程中使用者體驗的重要性及其實施策略...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2023-10-15', 'UX3 Team', 'https://img.youtube.com/vi/ByqGPdtRmQU/hqdefault.jpg', 325, 'Case Study', 1205, 83),
('行動應用的無障礙設計原則', '本視頻討論如何在行動應用中實施無障礙設計，確保所有用戶都能夠使用...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2023-09-28', 'Accessibility Design Lab', 'https://img.youtube.com/vi/gZWHG3lZBZo/hqdefault.jpg', 418, 'Accessibility', 972, 65),
('情感設計如何提升產品體驗', '情感設計不僅僅是讓產品看起來漂亮，而是通過理解用戶情感來創造更有意義的體驗...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2023-10-05', 'Emotional Design Studio', 'https://img.youtube.com/vi/qUiiiflrKkQ/hqdefault.jpg', 297, 'Design', 1456, 112);
