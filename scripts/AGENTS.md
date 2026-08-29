# `scripts/` 代理指引

## 範圍

腳本是用於旅遊指南內容與建置輸出的 TypeScript 維護工具。它們會透過 `tsx`/`npx` 手動執行，或在 GitHub Actions 中執行。

## 既有腳本

- `generate-image-dimensions.ts` 掃描 `docs/` 內的圖片，透過 Wikimedia API 或 `probe-image-size` 取得寬高，並快取至 `.vitepress/image-dimensions.json`。具備頻率限制（Rate Limit）處理機制。
- `update-markdown-images.ts` 讀取尺寸快取，將 Markdown 圖片語法 `![alt](url)` 替換為包含尺寸的 `<img>` 標籤，以優化 CLS。
- `verify-links.ts` 掃描 Markdown 的 `相關連結` 區塊，拒絕黑名單來源網域，並檢查 URL 是否可連線。
- `verify-images.ts` 掃描 Markdown 圖片，檢查遠端圖片 URL，並可修復部分 Wikimedia 連結。
- `get-wikimedia-image.ts` 將 Wikimedia Commons 檔案頁或檔名解析成直接圖片 URL。
- `create-moved-redirects.ts` 在 `npm run build` 後，為已移動頁面建立建置後 HTML 轉址檔。

## 程式準則

- 符合既有 ES module TypeScript 風格。
- 新增儲存庫維護腳本時，應使用 `scripts/` 下的 TypeScript 檔，不要使用 Python 腳本。
- 新 import 優先使用帶有 `node:` 前綴的 Node 內建模組。
- 腳本應可從儲存庫根目錄用專案工具鏈執行，通常是 `npx tsx scripts/name.ts`；若腳本本來支援 Bun，註解也可提到 Bun。
- URL 檢查腳本應明確設定網路逾時與 User-Agent 標頭。
- **圖片正規表達式**：處理 Markdown 圖片時，必須使用可處理平衡括號的 Regex：`/!\[(.*?)\]\(((?:[^()]+|\([^()]*\))*)\)/g`。這是因為許多圖片網址（特別是 Wikimedia）本身包含括號（如 `...File_Name_(0155).jpg`），標準非貪婪比對會提前截斷網址。
- **API 頻率限制與 Quirks**：
  - 存取外部 API（如 Wikimedia）時，必須實作 sleep 或 batching 處理，避免觸發 429 Too Many Requests。
  - Wikimedia API 的 `titles` 參數對大小寫、底線（`_`）與空格敏感。在比對 API 回傳結果與原始網址時，建議將兩者正規化（如移除空格與底線後轉小寫）再進行比對。
- 檢查連結時，除非最終目的地錯誤或非官方，否則 HTTP 重新導向（`3xx`）視為有效。
- 自動替換 URL 或內容時，將替換目標組成正規表達式前，必須先進行 escape。
- 除非腳本清楚回報變更檔案，否則避免大範圍自動改寫內容。
- 會修改檔案或建置輸出的腳本，應印出相對路徑與變更內容。

## 驗證

- 修改腳本程式後，若腳本影響建置或產出，請執行 `npm run build`。
- 掃描整個 `docs/` 前，先用小範圍目標路徑執行修改過的腳本。
- 網路相依腳本可能出現暫時性失敗；最終回報時要區分真實驗證失敗與連線或 rate limit 問題。
