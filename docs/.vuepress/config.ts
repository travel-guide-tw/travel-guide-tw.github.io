import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme, SidebarConfig, SidebarGroup } from 'vuepress'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { sitemapPlugin } from 'vuepress-plugin-sitemap2'

import glob from 'glob'

import * as dotenv from 'dotenv'
dotenv.config()

const sidebar: SidebarConfig = []

glob
  .sync('docs/**/*.md')
  .sort((a, b) => {
    const aArray = a.split('/')
    const bArray = b.split('/')

    for (let i = 0; i < Math.min(aArray.length, bArray.length); i++) {
      const aName = aArray[i]
      const bName = bArray[i]
      if (aName !== bName) {
        if (aName === 'index.md' || aName === 'README.md') {
          return -1
        }
        if (bName === 'index.md' || bName === 'README.md') {
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
    path.split('/').forEach((name, index, array) => {
      let children = sidebar

      for (let i = 0; i < index; i++) {
        children = (
          children.find(
            (child) => typeof child === 'object' && child.text === array[i]
          ) as SidebarGroup
        ).children
      }

      if (name === 'index.md' || name === 'README.md') {
        children.push(
          `/${path.replace('index.md', '').replace('README.md', '')}`
        )
        return
      }

      if (name.endsWith('.md')) {
        children.push(`/${path.replace('.md', '')}`)
        return
      }

      const child = children.find(
        (child) => typeof child === 'object' && child.text === name
      ) as SidebarGroup

      if (!child) {
        children.push({ text: name, children: [], collapsible: true })
      }
    })
  )

module.exports = {
  title: '台灣軟體人旅遊指南',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: process.env.VITE_APP_GOOGLE_META_TAG_CONTENT as string,
      },
    ],
  ],
  description:
    '專門給台灣人國內外旅遊資訊收集專案，觀迎提交 PR 擴充資訊，也歡迎發 Issues 討論',
  plugins: [
    searchPlugin(),
    googleAnalyticsPlugin({
      id: process.env.VITE_APP_GOOGLE_TAG_ID as string,
    }),
    sitemapPlugin({
      hostname: 'https://travel-guide-tw.github.io/',
    }),
  ],
  theme: defaultTheme({
    repo: 'https://github.com/travel-guide-tw/travel-guide-tw.github.io/',
    docsDir: 'docs',
    sidebar,
  }),
}
