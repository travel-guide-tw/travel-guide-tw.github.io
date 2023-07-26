import { DefaultTheme } from 'vitepress'
import getFilePaths from './getFilePaths'

export default function generateSidebar() {
  const sidebar: DefaultTheme.Sidebar = []

  getFilePaths()
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
              (child) => typeof child === 'object' && child.text === array[i],
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
          (child) => typeof child === 'object' && child.text === text,
        ) as DefaultTheme.Sidebar

        if (!child) {
          items.push({ text: text, items: [], collapsed: true })
        }
      }),
    )

  return sidebar
}
