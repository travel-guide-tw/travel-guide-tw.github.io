import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'fs/promises'

import * as cheerio from 'cheerio'

// @ts-ignore
import taskList from 'markdown-it-task-lists'

import gtagHead from './typescript/node/gtagHead'
import generateSidebar from './typescript/node/generateSidebar'
import generateRewrites from './typescript/node/generateRewrites'

import pkg from '../package.json'
import linkPreviewPlugin from './typescript/node/linkPreviewPlugin'

const hostname = 'https://travel-guide-tw.github.io/'
const title = '開源旅遊共筆'

export default withMermaid({
  base: '/',
  description: pkg.description,
  lang: 'zh-Hant-TW',
  head: [['meta', { property: 'og:site_name', content: title }], ...gtagHead],
  themeConfig: {
    sidebar: generateSidebar(),
    editLink: {
      pattern: ({ filePath }: { filePath: string }) => {
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
    footer: {
      message: `
        本網站內容採用 
        <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a> 
        授權，禁止商業用途，使用時請標明來源。<br />
        原始碼遵循 
        <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache 2.0 授權</a>。
      `,
      copyright: `© ${new Date().getFullYear()} Travel Guide TW. 版權所有。`,
    },
  },
  title,
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
    config: (md) => {
      md.use(taskList).use(linkPreviewPlugin)
    },
    image: {
      lazyLoading: true,
    },
  },
  mermaid: {},
  mermaidPlugin: {
    class: 'mermaid',
  },
  async transformHead({ content, head, pageData }) {
    const $ = cheerio.load(content)
    const pageTitle = $('h1').text().trim().replace(' ', '') // trim a regular space
    const image =
      $('img')?.attr('src') ||
      'https://github.com/user-attachments/assets/c0d2f761-819b-43df-8e7e-b45db22f268a'

    head.push(['meta', { property: 'og:title', content: pageTitle }])
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

    try {
      const fileContent = await fs.readFile(
        pageData.filePath.replace('.md', '.schema.json'),
        'utf-8',
      )

      head.push([
        'script',
        {
          type: 'application/ld+json',
        },
        fileContent,
      ])
    } catch (e) {}

    return head
  },
})
