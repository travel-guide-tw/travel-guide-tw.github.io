# 代理指引

## 專案概覽

此儲存庫是以 VitePress 建置的繁體中文旅遊指南。主要使用者內容是 `docs/` 底下的 Markdown；VitePress 應用與建置客製化位於 `.vitepress/`；維護腳本位於 `scripts/`；GitHub Actions 位於 `.github/`。

## 安裝與指令

- 使用 `npm i` 安裝依賴。CI 使用 Node.js 20，並執行 `npm i --force`。
- 使用 `npm run dev` 啟動本地網站。
- 使用 `npm run build` 驗證網站建置。
- 使用 `npm run check` 檢查格式；使用 `npm run format` 套用格式化。
- 大量修改中文內容時，使用 `npm run correct` 修正中英文間距等文字問題。
- 連結與圖片驗證腳本會發出網路請求。僅在需要時執行，並預期可能出現暫時性失敗：
  - `npx tsx scripts/verify-links.ts [path-or-url]`
  - `npx tsx scripts/verify-images.ts [path]`

## 儲存庫慣例

- 除了引用專有名詞、官方名稱、地址或來源標題外，內容應使用繁體中文（`zh-Hant-TW`）。
- 優先做小而明確的事實型更新。旅遊資訊常變動，修改價格、營業時間、入境規則、票券、交通時刻或簽證資訊前，必須先確認最新官方來源。
- 外部旅遊參考資料應使用官方來源：景點官網、政府機關、交通營運單位、觀光局、地方觀光協會，或 JNTO 等國家級旅遊機構。避免以個人部落格、評論平台、社群貼文或非官方商業整理文章作為引用。
- 不要為內容頁加入本地二進位圖片檔。請使用外部託管圖片網址，合適時優先使用穩定的 Wikimedia Commons 網址。
- 不要提交 `.vitepress/dist`、`public/json/preview`、快取或本地環境檔等產出物。
- 尊重現有檔名與網址形狀。移動或重新命名 Markdown 檔會改變公開網址與側邊欄連結；若需要保留舊路徑，請在 `scripts/create-moved-redirects.ts` 加入轉址。
- 檔案與資料夾可使用非 ASCII 名稱。保留現有繁體中文命名風格，不要為了 ASCII 化而改寫路徑。
- 除非使用者明確要求，不要執行 stage、commit、push 或其他 Git 歷史操作。

## Markdown 與連結

- VitePress 已啟用 clean URLs。內部 Markdown 連結通常省略 `.md`，例如 `./景點/東京晴空塔`。
- `docs/` 內頁面請使用相對連結。
- Markdown 連結與 schema URL 應保持非英文路徑可讀。不要對中文或日文路徑字元做百分比編碼；必要時可保留空格等標準符號編碼。
- 使用 `## 相關連結` 區塊放置來源連結。優先使用官方觀光、交通、景點、政府或機構來源。
- `相關連結` 避免使用 `scripts/verify-links.ts` 黑名單中的網域。
- 嵌入 Google Maps iframe 時，使用 `## 地圖` 標題；可用時包含 `loading="lazy"` 與 `allowfullscreen`；移除固定 `width`、`height` 與 `style` 屬性，讓網站樣式維持響應式。

## 結構化資料

- 部分 Markdown 頁面有對應的 `*.schema.json`。建置時會在同名 Markdown 頁面注入 schema 檔。
- 新增或更新 schema 檔時，保持 JSON 有效，並與頁面標題、描述、地址及最終 clean URL 一致。
- 不要為每次內容編輯都預設建立 schema 檔；只有鄰近內容已有相同模式，或頁面代表明確地點/列表頁時再新增。

## 程式風格

- TypeScript 使用 ES modules、strict mode 與 no emit。請符合既有 import 與格式風格。
- 修改腳本程式時，優先使用帶有 `node:` 前綴的 Node 內建模組。
- VitePress 客製化應依既有邊界放在 `.vitepress/typescript/node` 或 `.vitepress/theme`。
- 保持修改範圍集中。做內容修改時，不要順手重構側邊欄、rewrite 或 metadata 產生邏輯。

## 驗證指引

- 純內容修改時，可行的話執行 `npm run check`；若變更連結、標題、iframe、schema JSON 或導覽結構，請執行 `npm run build`。
- 修改 VitePress 設定、theme 或腳本時，請執行 `npm run build`。
- 若跳過網路相依腳本，或因連線問題失敗，請明確說明。
