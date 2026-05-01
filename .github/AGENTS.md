# `.github/` 代理指引

## 範圍

此目錄包含 GitHub Actions 工作流程、議題範本、labeler 設定、Dependabot 與 PR 自動化。

## 工作流程預期

- 文件建置工作流程使用 Node.js 20，並以 `npm i --force` 安裝依賴。
- PR 會透過 `.github/workflows/docs_test.yml` 執行 `npm run build`。
- 推送到 `main` 時，會透過 `.github/workflows/docs.yml` 建置並部署網站。
- 格式化自動化會在 `main` 執行 `npm run correct` 與 `npm run format`。

## 修改準則

- 工作流程變更應保持最小，並與 GitHub Pages 部署相容。
- 不要加入 secrets 或硬編碼憑證。
- 若 `package.json` 的建置指令改變，請在同一個變更中更新工作流程。
- 優先使用此儲存庫風格中已使用的官方或固定版本 marketplace actions。
- 除非刻意修改文字，否則保留議題範本與貢獻者可見文案中的繁體中文。
- 準備 PR 文字時，遵循 `.github/pull_request_template.md`：包含 `說明`、`改動內容` 與 `相關資料`；內容變更應附上官方參考資料。

## 驗證

- 修改 workflow 時，可行的話在本地驗證 YAML 語法，並說明無法執行的檢查。
- 修改指令時，完成前執行對應的本地 `npm` script。
