import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme, SidebarConfig, SidebarGroup } from 'vuepress'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import glob from 'glob'

import * as dotenv from 'dotenv'
dotenv.config()

const sidebar: SidebarConfig = []

glob
  .sync('docs/**/*.md')
  .map((path) => path.replace('docs/', ''))
  .sort()
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
  base: '/tour_info_zh-tw/',
  title: '台灣軟體人旅遊指南',
  description:
    '專門給台灣人國內外旅遊資訊收集專案，觀迎提交 PR 擴充資訊，也歡迎發 Issues 討論',
  plugins: [
    searchPlugin(),
    googleAnalyticsPlugin({
      id: process.env.VITE_APP_GOOGLE_TAG_ID as string,
    }),
  ],
  theme: defaultTheme({
    repo: 'ronny1020/tour_info_zh-tw',
    docsDir: 'docs',
    sidebar,
  }),
}
