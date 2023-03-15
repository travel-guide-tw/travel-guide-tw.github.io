import { defineConfig } from 'vitepress'
import * as dotenv from 'dotenv'

import gtagHead from './typescript/node/generateSidebar'
import generateSidebar from './typescript/node/sidebat'
import generateRewrites from './typescript/node/generateRewrites'

dotenv.config()

export default defineConfig({
  base: '/',
  description:
    '專門給台灣人國內外旅遊資訊收集專案，觀迎提交 PR 擴充資訊，也歡迎發 Issues 討論',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: <string>process.env.VITE_APP_GOOGLE_META_TAG_CONTENT,
      },
    ],
    ...gtagHead,
  ],
  themeConfig: {
    sidebar: generateSidebar(),
    editLink: {
      pattern: ({ relativePath }) => {
        return `https://github.com/travel-guide-tw/travel-guide-tw.github.io/edit/main/docs/${relativePath}`
      },
      text: 'Edit this page on GitHub',
    },
  },
  title: '台灣軟體人旅遊指南',
  rewrites: generateRewrites(),
})
