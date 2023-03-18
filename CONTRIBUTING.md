# 開發貢獻說明

首先感謝您願意協助開發，為了維持專案撰寫風格，請詳閱以下內容。

## 開始

### 方式一

建議有大量內容修改時使用。

1. 在 fork 並且 clone 之後，可執行 `npm i` 安裝排版相關工具。(需要安裝 [node.js](https://nodejs.org/) 才能執行)。
2. 編寫內容。
3. 使用 npm run format 排版。
4. commit 後方發 PR

### 方式二

1. fork 專案
2. 可直接在 Github 上進行編輯
3. 發 PR，讓 GitHub Action 自動排版

## 注意事項

1. 推薦可以搭配 vscode [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 插件開發。
2. 圖片檔請另外上傳至 [imgur](https://imgur.com/) 等免費空間防止專案空間太大。
3. 資料夾加底線是為了使目標提升到最前面，主要用於不分去類型，非必要請勿添加。
4. 使用 iframe 內嵌 google 請移除樣式相關設定，包含 `width`, `height`, `style`，以保持統一風格且具有 RWD 功能。
5. 請確定提供的訊息不會有版權問題。
6. 發了 PR 後可先至預覽葉面觀看結果。
