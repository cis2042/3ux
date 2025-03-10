import { createClient } from '@supabase/supabase-js';

// 創建 Supabase 客戶端
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('環境變數狀態:', {
  'VITE_SUPABASE_URL': supabaseUrl ? '已設置' : '未設置',
  'VITE_SUPABASE_ANON_KEY': supabaseAnonKey ? '已設置' : '未設置',
  'NODE_ENV': import.meta.env.MODE,
  'BASE_URL': import.meta.env.BASE_URL
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('請確保在 .env 文件中設置了 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('創建 Supabase 客戶端:', { url: supabaseUrl });

export { supabase };

// 測試數據庫連接
// 測試數據庫連接
const testConnection = async () => {
  try {
    const response = await supabase.from('videos').select('count', { count: 'exact' });
    if (response.error) {
      console.error('Supabase連接錯誤:', response.error.message);
    } else {
      console.info(`Supabase連接成功，數據庫中有 ${response.count} 條視頻記錄`);
    }
  } catch (err) {
    console.error('Supabase連接失敗:', err instanceof Error ? err.message : String(err));
  }
};

testConnection();

// 獲取視頻數據
export const getVideos = async () => {
  const response = await supabase
    .from('videos')
    .select(`
      id,
      title,
      description,
      url,
      upload_date,
      creator,
      duration,
      thumbnail_url,
      likes,
      views_count,
      article_url,
      category,
      created_at
    `)
    .order('created_at', { ascending: false });

  if (response.error) {
    console.error('Failed to fetch videos:', response.error);
    throw new Error(`Failed to fetch videos: ${response.error.message}`);
  }

  // 轉換數據格式以符合前端期望
  const videos = (response.data || []).map(video => ({
    ...video,
    uploadDate: video.upload_date ? new Date(video.upload_date).toISOString().split('T')[0] : 
               new Date(video.created_at).toISOString().split('T')[0],
    thumbnailUrl: video.thumbnail_url,
    views_count: video.views_count || 0,
    likes: video.likes || 0
  }));

  console.log('轉換後的視頻數據:', videos);
  return videos;
};