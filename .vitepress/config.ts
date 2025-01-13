import { defineConfig } from 'vitepress'

// @ts-ignore
import taskList from 'markdown-it-task-lists'

import gtagHead from './typescript/node/gtagHead'
import generateSidebar from './typescript/node/generateSidebar'
import generateRewrites from './typescript/node/generateRewrites'
import * as cheerio from 'cheerio'

import pkg from '../package.json'

const hostname = 'https://travel-guide-tw.github.io/'

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
    hostname,
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
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(taskList)
    },
  },
  async transformHead({ content, head, pageData }) {
    const $ = cheerio.load(content)
    const title = $('h1').text().trim().replace(' ', '') // trim a regular space
    const image =
      $('img')?.attr('src') ||
      'https://github.com/user-attachments/assets/c0d2f761-819b-43df-8e7e-b45db22f268a'

    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:type', content: 'article' }])
    head.push(['meta', { property: 'og:image', content: image }])
    head.push([
      'meta',
      {
        property: 'og:url',
        content:
          hostname +
          pageData.relativePath.replace('.md', '').replace('index', ''),
      },
    ])

    return head
  },
})
