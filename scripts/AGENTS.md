# `scripts/` 代理指引

## 範圍

腳本是用於旅遊指南內容與建置輸出的 TypeScript 維護工具。它們會透過 `tsx`/`npx` 手動執行，或在 GitHub Actions 中執行。

## 既有腳本

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
- 檢查連結時，除非最終目的地錯誤或非官方，否則 HTTP 重新導向（`3xx`）視為有效。
- 自動替換 URL 或內容時，將替換目標組成正規表達式前，必須先進行 escape。
- 除非腳本清楚回報變更檔案，否則避免大範圍自動改寫內容。
- 會修改檔案或建置輸出的腳本，應印出相對路徑與變更內容。

## 驗證

- 修改腳本程式後，若腳本影響建置或產出，請執行 `npm run build`。
- 掃描整個 `docs/` 前，先用小範圍目標路徑執行修改過的腳本。
- 網路相依腳本可能出現暫時性失敗；最終回報時要區分真實驗證失敗與連線或 rate limit 問題。
