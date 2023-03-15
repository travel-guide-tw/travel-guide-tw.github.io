import { DefaultTheme, defineConfig } from 'vitepress'

import glob from 'glob'

import * as dotenv from 'dotenv'

dotenv.config()

const sidebar: DefaultTheme.Sidebar = []

glob
  .sync('docs/**/*.md')
  .sort((a, b) => {
    const aArray = a.split('/')
    const bArray = b.split('/')

    for (let i = 0; i < Math.min(aArray.length, bArray.length); i++) {
      const aName = aArray[i]
      const bName = bArray[i]
      if (aName !== bName) {
        if (aName === 'index.md') {
          return -1
        }
        if (bName === 'index.md') {
          return 1
        }
        if (aName.endsWith('.md') && !bName.endsWith('.md')) {
          return -1
        }
        if (!aName.endsWith('.md') && bName.endsWith('.md')) {
          return 1
        }
        return aName.localeCompare(bName)
      }
    }

    return 0
  })
  .map((path) => path.replace('docs/', '').replace(/_/g, ''))
  .forEach((path) =>
    path.split('/').forEach((text, index, array) => {
      let items = sidebar

      for (let i = 0; i < index; i++) {
        items = (
          items.find(
            (child) => typeof child === 'object' && child.text === array[i]
          ) as DefaultTheme.SidebarMulti
        ).items
      }

      if (text === 'index.md') {
        const pageName = array[index - 1]

        items.push({
          text: pageName ? `${pageName}介紹` : '首頁',
          link: `/${path.replace('index.md', '')}`,
        })
        return
      }

      if (text.endsWith('.md')) {
        items.push({
          text: text.replace('.md', ''),
          link: `/${path.replace('.md', '')}`,
        })
        return
      }

      const child = items.find(
        (child) => typeof child === 'object' && child.text === text
      ) as DefaultTheme.Sidebar

      if (!child) {
        items.push({ text: text, items: [], collapsed: true })
      }
    })
  )

const rewrites = Object.fromEntries(
  glob
    .sync('docs/**/*.md')
    .map((path) => path.replace('docs/', ''))
    .map((path) => [path, path.replace(/_/g, '')])
)

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
  ],
  themeConfig: {
    sidebar,
    editLink: {
      pattern: ({ relativePath }) => {
        return `https://github.com/travel-guide-tw/travel-guide-tw.github.io/edit/main/docs/${relativePath}`
      },
      text: 'Edit this page on GitHub',
    },
  },
  title: '台灣軟體人旅遊指南',
  rewrites,
})
