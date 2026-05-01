# `.vitepress/` 代理指引

## 範圍

此目錄包含 VitePress 設定、theme 客製化、樣式與建置時輔助工具。這裡的變更會影響整個網站。

## 架構

- `.vitepress/config.ts` 是主要 VitePress 設定。它串接 Mermaid、本地搜尋、編輯連結、自動產生側邊欄、rewrites、Open Graph metadata、schema 注入與 link preview 快取產生。
- `.vitepress/typescript/node/generateSidebar.ts` 會從 `docs/` 下的 Markdown 路徑建立側邊欄。
- `.vitepress/typescript/node/generateRewrites.ts` 會把 `docs/` 原始路徑映射到公開 clean path，並移除公開 URL 中的底線。
- `.vitepress/typescript/node/linkPreviewPlugin.ts` 處理外部連結的 preview 資料。
- `.vitepress/theme/` 與 `.vitepress/components/` 包含 Vue theme 擴充。
- `.vitepress/styles/` 包含全域 SCSS 與響應式 iframe 規則。

## 修改準則

- 維持全域行為穩定。側邊欄順序、URL rewrites 與 metadata 產生會影響每一頁。
- 除非刻意改變 URL 政策，否則保留 clean URLs 與公開路徑移除底線的既有行為。
- 不要加入 `ignoreDeadLinks: true` 來隱藏建置失敗。內部壞連結應透過修正路徑或新增預期頁面處理。
- 不要提交 `.vitepress/dist`；它由 `npm run build` 產生。
- 使用既有輔助工具邊界。Node 建置輔助工具放在 `.vitepress/typescript/node`，前端 utility 放在 `.vitepress/typescript/utils` 或 `.vitepress/utils`，Vue UI 放在 `.vitepress/components` 或 `.vitepress/theme`。
- 網站語言與 metadata 應維持 `zh-Hant-TW`。

## 驗證

- 任何 `.vitepress/` 變更後都要執行 `npm run build`。
- 若修改樣式或版面，執行 `npm run dev` 並檢查代表性內容頁，包含有 Google Maps iframe、圖片、Mermaid 區塊與 link preview 的頁面。
- 若修改側邊欄或 rewrite 邏輯，確認包含底線與多層非 ASCII 目錄的路徑。
