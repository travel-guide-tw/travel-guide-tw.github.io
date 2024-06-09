import { defineConfig } from 'vitepress'
import * as dotenv from 'dotenv'

// @ts-ignore
import taskList from 'markdown-it-task-lists'
// @ts-ignore
import linkPreview from 'markdown-it-link-preview'

import gtagHead from './typescript/node/gtagHead'
import generateSidebar from './typescript/node/generateSidebar'
import generateRewrites from './typescript/node/generateRewrites'

export default defineConfig({
  base: '/',
  description:
    '專門給台灣人國內外旅遊資訊收集專案，觀迎提交 PR 擴充資訊，也歡迎發 Issues 討論',
  head: gtagHead,
  themeConfig: {
    sidebar: generateSidebar(),
    editLink: {
      pattern: ({ filePath }) =>
        `https://github.com/travel-guide-tw/travel-guide-tw.github.io/edit/main/docs/${filePath}`,
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/travel-guide-tw/travel-guide-tw.github.io/',
      },
    ],
  },
  title: '台灣開源旅遊指南',
  rewrites: generateRewrites(),
  sitemap: {
    hostname: 'https://travel-guide-tw.github.io/',
  },
  lastUpdated: true,
  async transformPageData({ relativePath, title, ...rest }) {
    const routes = relativePath.split('/')
    routes[routes.length - 1] = title

    return {
      relativePath,
      ...rest,
      title: routes.join(' -> '),
    }
  },
  srcDir: 'docs',
  cleanUrls: true,
  markdown: {
    config: (md) => md.use(taskList).use(linkPreview),
  },
})
