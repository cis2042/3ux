import { createClient } from '@supabase/supabase-js';

// 創建 Supabase 客戶端
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    .select('*')
    .order('created_at', { ascending: false });

  if (response.error) {
    throw new Error(`Failed to fetch videos: ${response.error.message}`);
  }

  return response.data || [];
};