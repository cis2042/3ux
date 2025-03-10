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
    .select('*')
    .order('created_at', { ascending: false });

  if (response.error) {
    console.error('獲取視頻時出錯:', response.error);
    throw new Error(`獲取視頻時出錯: ${response.error.message}`);
  }

  console.log('從 Supabase 獲取到視頻數據:', {
    count: response.data?.length || 0,
    sample: response.data?.[0]
  });

  return response.data || [];
};