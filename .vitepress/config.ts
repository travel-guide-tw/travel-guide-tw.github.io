import { defineConfig } from 'vitepress'

// @ts-ignore
import taskList from 'markdown-it-task-lists'

import gtagHead from './typescript/node/gtagHead'
import generateSidebar from './typescript/node/generateSidebar'
import generateRewrites from './typescript/node/generateRewrites'

import pkg from '../package.json'

export default defineConfig({
  base: '/',
  description: pkg.description,
  lang: 'zh-Hant-TW',
  head: gtagHead,
  themeConfig: {
    sidebar: generateSidebar(),
    editLink: {
      pattern: ({ filePath }) => {
        return `https://github.com/travel-guide-tw/travel-guide-tw.github.io/edit/main/${filePath}`
      },
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
  title: '開源旅遊共筆',
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
  srcDir: '.',
  cleanUrls: true,
  markdown: {
    config: (md) => {
      md.use(taskList)
    },
  },
})
