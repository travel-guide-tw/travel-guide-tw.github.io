# 開發貢獻說明

首先，感謝您願意協助貢獻！為了維持專案的撰寫風格與品質，請在開始之前詳閱以下說明。

## 開始貢獻

您可以選擇以下兩種方式進行貢獻，依據您的需求和修改的內容量選擇適合的方式：

### 方式一：Clone 本地開發

適合有大量內容修改的情況，或需進行較多本地測試時使用。

1. **Fork 並 Clone 專案**

   - 先 Fork 此專案到您的 GitHub 帳號，然後使用 `git clone` 將其 Clone 到本地。

2. **安裝工具**

   - 在專案目錄下執行 `npm i` 安裝專案依賴工具。（您需要安裝 [Node.js](https://nodejs.org/)）

3. **編寫內容與修改**

   - 編輯和撰寫您想要貢獻的內容。

4. **排版與格式化**

   - 使用 `npm run format` 來自動進行排版，保持一致的代碼風格。

5. **提交修改**

   - 提交您的更改，使用 Git commit，然後推送到您 Fork 的儲存庫。

6. **發送 Pull Request（PR）**
   - 最後，在 GitHub 上發 PR，等待維護者審核並合併。

### 方式二：直接在 GitHub 上編輯

適合進行少量修改或簡單內容編輯的情況。

1. **點擊 "Edit this page on GitHub" 按鈕**

   - 瀏覽到您想要修改的 VitePress 頁面，然後點擊頁面下方的 **"Edit this page on GitHub"** 按鈕，這將會跳轉至 GitHub 頁面。

2. **Fork 專案**

   - 如果您尚未 Fork 該存儲庫，GitHub 會提示您 Fork 存儲庫。點擊 Fork，並將專案複製到您的帳戶中。

3. **在線編輯**

   - 在 Fork 後的存儲庫中，直接在 GitHub 上進行文件編輯，無需 clone 專案。完成編輯後，輸入提交信息。

4. **提交 PR**
   - 在提交修改後，GitHub 會提示您發送 **Pull Request**。您可以點擊提交 PR，GitHub Actions 會自動進行格式化和排版，確保代碼風格一致。

## 注意事項

在開發和提交 PR 之前，請注意以下幾點：

1. **代碼風格**

   - 建議在本地開發時使用 VS Code 的 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 插件，確保代碼格式一致。

2. **圖片處理**

   - 請將圖片上傳至 [Imgur](https://imgur.com/) 或其他免費圖床，以免專案儲存空間過大。

3. **資料夾命名**

   - 資料夾加底線是為了將目標提升至前面。非必要請勿添加。

4. **Google Iframe 嵌入**

   - 嵌入 Google 的 iframe 時，請移除 `width`, `height`, `style` 等樣式設定，以保持 RWD（響應式設計）功能和統一風格。

5. **版權問題**

   - 請確保您提供的內容沒有版權問題。

6. **預覽頁面**
   - 發 PR 後，可以在預覽頁面查看結果，確保內容無誤。

---

再次感謝您的貢獻！我們期待看到您的修改，讓這個專案變得更好！
