# 3UX - 現代UI視頻分享平台

一個現代化、精美的視頻分享平台，具有櫻花動畫效果和卡哇伊設計風格。2024 年 UX 案例研究項目。

## 在線訪問

訪問在線演示: [https://cis2042.github.io/3ux](https://cis2042.github.io/3ux)

## 功能亮點

- 🌸 精美櫻花動畫效果
- 🎞️ 流暢的視頻播放體驗
- 🎨 現代化UI設計
- 🌙 深色模式支持
- 🔍 視頻搜索功能
- 💖 視頻點贊功能

## 開發指南

### 安裝依賴

```bash
npm install
```

### 本地開發

```bash
npm run dev
```

### 構建生產版本

```bash
npm run build
```

## 部署

該項目已配置自動部署到GitHub Pages。當推送到main分支時，GitHub Actions會自動構建並部署應用。

### 部署設置

1. 克隆倉庫：
   ```bash
   git clone https://github.com/cis2042/3ux.git
   cd 3ux
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 設置環境變量：
   - 複製 `.env.example` 到 `.env`
   - 填入您的 Supabase 配置

4. GitHub 設置：
   - 在倉庫設置中添加以下 Secrets：
     - `VITE_SUPABASE_URL`: 您的 Supabase 項目 URL
     - `VITE_SUPABASE_ANON_KEY`: 您的 Supabase 匿名密鑰
   - 啟用 GitHub Pages：
     - 進入倉庫 -> Settings -> Pages
     - Source 設置為 "GitHub Actions"

5. 推送更改：
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

推送後，GitHub Actions 會自動構建並部署應用到 GitHub Pages。

## 技術棧

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Supabase

## 授權

MIT License
