import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from 'lucide-react';
import VideoGrid from './components/VideoGrid';
import HeaderControls from './components/HeaderControls';
import ScrollToTop from './components/ScrollToTop';
import Logo from './components/Logo';
import VideoPage from './pages/VideoPage';
import SortControl, { SortOption } from './components/SortControl';
import { Video } from './types';
import { getVideos } from './lib/supabaseClient';
import { useTranslation } from './hooks/useTranslation';
import CherryBlossomProvider from './contexts/CherryBlossomContext';
import TestPage from './pages/TestPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const { t } = useTranslation();
  
  const videosPerPage = 24;

  // 添加調試日誌
  useEffect(() => {
    console.log('應用程序初始化 - 環境:', import.meta.env.MODE);
    console.log('基礎URL:', import.meta.env.BASE_URL || '/3ux');
  }, []);

  const loadVideos = async (pageNumber: number): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('開始加載視頻數據...');
      
      // 從 Supabase 獲取視頻數據
      const allVideos = await getVideos();
      console.log('從 Supabase 獲取到視頻數據:', allVideos.length);
      
      // 儲存所有視頻數據
      setVideos(allVideos);
      
      // 計算分頁和過濾
      if (searchTerm) {
        const filtered = allVideos.filter((video: Video) => 
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(`搜索 "${searchTerm}" 找到 ${filtered.length} 個結果`);
        setFilteredVideos(filtered);
      } else {
        setFilteredVideos(allVideos);
      }
      
      setHasMore(allVideos.length > pageNumber * videosPerPage);
    } catch (error) {
      console.error('加載視頻時出錯:', error);
      setError('加載視頻時出錯');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadVideos(1);
  }, [sortBy]);

  // 當搜索詞變化時更新過濾結果
  useEffect(() => {
    if (videos.length > 0) {
      const filtered = videos.filter((video: Video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(`搜索 "${searchTerm}" 找到 ${filtered.length} 個結果`);
      setFilteredVideos(filtered);
    }
  }, [searchTerm, videos]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
      loadVideos(page + 1);
    }
  };

  // 根據排序方式對過濾後的視頻進行排序
  const displayVideos = [...filteredVideos].sort((a: Video, b: Video) => {
    if (sortBy === 'date') {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    } else if (sortBy === 'views') {
      return (b.views_count || 0) - (a.views_count || 0);
    } else if (sortBy === 'likes') {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0;
  });

  // 分頁處理
  const paginatedVideos = displayVideos.slice(0, page * videosPerPage);

  return (
    <Router>
      <CherryBlossomProvider>
        <div className="min-h-screen bg-pink-50 dark:bg-gray-900 kawaii-dot-pattern">
          <div className="parallax-bg" />
          
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-kawaii-pink/10 dark:border-primary-700/20">
            <div className="kawaii-container py-2">
              <div className="kawaii-flex-between">
                <Logo className="animate-fade-in" />
                <div className="flex items-center space-x-4">
                  <div className="relative w-56">
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      className="input pl-10 py-2 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-gray-300" />
                  </div>
                  <SortControl currentSort={sortBy} onSortChange={setSortBy} />
                  <HeaderControls />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="kawaii-container py-3">
            <Routes>
              <Route path="/video/:videoId" element={<VideoPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route
                path="/"
                element={
                  <>
                    <div className="kawaii-page-header kawaii-flex-between">
                      <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {t('title')}
                      </h1>
                      {searchTerm && (
                        <p className="text-sm font-kawaii text-gray-600 dark:text-gray-400">
                          {filteredVideos.length} {filteredVideos.length === 1 ? 'result' : 'results'} for "{searchTerm}"
                        </p>
                      )}
                    </div>
                  
                    {isLoading && videos.length === 0 ? (
                      <div className="kawaii-grid">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="card animate-pulse">
                            <div className="aspect-video bg-gray-200 dark:bg-gray-700 skeleton" />
                            <div className="p-3 space-y-2">
                              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : filteredVideos.length === 0 ? (
                      <div className="kawaii-section kawaii-flex-center flex-col p-8">
                        <div className="text-5xl mb-3">🥺</div>
                        <h2 className="text-lg font-kawaii text-primary-700 dark:text-primary-300">
                          {t('noResults')}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          可能您想嘗試不同的搜尋關鍵字
                        </p>
                      </div>
                    ) : (
                      <VideoGrid 
                        videos={paginatedVideos}
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore && !searchTerm}
                      />
                    )}
                  </>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="mt-8 py-6 border-t border-kawaii-pink/10 dark:border-primary-700/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="kawaii-container">
              <div className="kawaii-flex-between">
                <div>
                  <Logo className="h-12 w-auto" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    © 2025 UX3 期中報告案例影片
                  </p>
                </div>
                <div className="flex space-x-6">
                  <div>
                    <h3 className="font-kawaii text-sm text-primary-700 dark:text-primary-300 mb-2">連結</h3>
                    <ul className="space-y-1">
                      <li><a href="#/" className="menu-item text-sm inline-block">首頁</a></li>
                      <li><a href="#/test" className="menu-item text-sm inline-block">測試頁面</a></li>
                      <li><a href="#/contact" className="menu-item text-sm inline-block">聯繫我們</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-kawaii text-sm text-primary-700 dark:text-primary-300 mb-2">工具</h3>
                    <ul className="space-y-1">
                      <li><a href="#/" className="menu-item text-sm inline-block">上傳影片</a></li>
                      <li><a href="#/" className="menu-item text-sm inline-block">設定</a></li>
                      <li><a href="#/" className="menu-item text-sm inline-block">幫助中心</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          <ScrollToTop />
        </div>
      </CherryBlossomProvider>
    </Router>
  );
}

export default App;