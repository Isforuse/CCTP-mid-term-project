🌦️ Vibe Weather — AI 協作氣象查詢系統

Vibe Weather 是透過 Vibe Coding 方式建立的前端氣象查詢 Web Application。
使用者可輸入城市名稱，並即時取得該城市目前的天氣資訊，包含：

🌡️ 氣溫

🌤️ 天氣狀態與圖示

💧 濕度

🌍 城市名稱（含國家代碼）

資料來源為 OpenWeather API。

🚀 功能 Features

目前已完成：

✅ 即時天氣查詢

使用者可輸入任意城市名稱（例：Taipei, Tokyo, Seoul），並透過 OpenWeather API 取得：

城市名稱

氣溫（攝氏）

天氣描述（中文）

天氣圖示

濕度

主要程式碼位於：
script.js 中的 fetchWeather() 與 handleSearch()
（見：）

✅ 自動錯誤處理

當使用者輸入空字串或查無城市時，系統會顯示錯誤訊息，而不是整個畫面壞掉。

✅ 高質感 UI（已完成基礎設計）

介面採用：

Glassmorphism 玻璃擬物效果

動態漸層背景

圓角卡片

現代化輸入框與按鈕

樣式來源：style.css
（見：）

✅ 可直接部署於任何靜態網站平台

包含：

GitHub Pages

Netlify

Vercel

網頁主結構位於：index.html
（見：）

🎯 未來將加入（期中專案等級功能）

以下是你計畫中的完整擴充清單，未來將逐步加入：

📡 資料與邏輯

3 小時預報（未來 12 小時天氣）

詳細資訊卡（最高 / 最低 / 氣壓 / 能見度 / 風速）

日出 / 日落時間＋動畫

自動定位（使用 Geolocation API）

收藏城市（localStorage）

城市地圖（Leaflet + 城市箭頭高亮）

風向羅盤（箭頭旋轉顯示方向）

🌈 視覺與互動效果

依天氣切換背景主題（雨天 / 雪天 / 晴 / 夜間）

雨滴、雪花、雷電動畫

天氣 icon 動態效果（太陽旋轉、雲朵飄動）

城市名稱打字機效果

動態背景流動（Gradient Animation）

預報卡片滑入動畫（Fade + Slide）

此 README 會在新增功能後同步更新不同版本（v1 → v2 → v3）。

🛠️ 技術架構
Frontend

HTML

CSS（玻璃化＋漸層＋動畫）

JavaScript (Vanilla JS)

API

OpenWeather Current Weather API

即將加入的第三方工具

Leaflet.js（地圖）

Unsplash API（城市圖片背景，可選）

📁 專案結構

目前版本：

/VibeWeather
├── index.html
├── style.css
└── script.js


期中專案「完成後」預計變成：

/VibeWeather
│
├── index.html
├── style.css
├── script.js
│
├── /components
│     ├── currentWeather.js
│     ├── hourlyForecast.js
│     ├── sunriseSunset.js
│     ├── favorites.js
│     ├── geolocation.js
│     ├── map.js
│     ├── windCompass.js
│
├── /animations
│     ├── weatherBackground.js
│     ├── rainEffect.js
│     ├── snowEffect.js
│     ├── lightningEffect.js
│     ├── typingEffect.js
│
└── /assets
      ├── icons/
      └── images/

📖 主要程式流程簡介
1️⃣ 使用者輸入城市 → 按下「查詢天氣」

（或按 Enter）

2️⃣ 前端呼叫 OpenWeather API

fetchWeather()
→ 傳入城市字串
→ 回傳 JSON

3️⃣ 解析資料 → 更新 DOM

包含：

城市名稱

溫度

icon

濕度

4️⃣ 顯示結果 & 隱藏 loading 狀態