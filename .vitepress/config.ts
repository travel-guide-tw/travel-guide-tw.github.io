import { defineConfig } from 'vitepress'
import * as dotenv from 'dotenv'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

import gtagHead from './typescript/node/gtagHead'
import generateSidebar from './typescript/node/generateSidebar'
import generateRewrites from './typescript/node/generateRewrites'
import searchPlugin from './typescript/node/searchPlugin'

dotenv.config()

const links: { lastmod?: number; url: string }[] = []

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
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/travel-guide-tw/travel-guide-tw.github.io/',
      },
    ],
  },
  title: '台灣軟體人旅遊指南',
  rewrites: generateRewrites(),
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://travel-guide-tw.github.io/',
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
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
  vite: { plugins: [searchPlugin], build: { ssr: false } },
  srcDir: 'docs',
  cleanUrls: true
})
