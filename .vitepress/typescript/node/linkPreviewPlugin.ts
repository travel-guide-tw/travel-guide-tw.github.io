import MarkdownIt, { StateCore, Token } from 'markdown-it'
import ogs from 'open-graph-scraper'
import fs from 'fs'
import path from 'path'
import fnv1a from '../../utils/fnv1a'

const previewLinkUrls = new Set<string>()
const oneYearInMs = 365 * 24 * 60 * 60 * 1000
const timeout = 30 * 1000

function isUrlClearlyNotHtml(url: string): boolean {
  return ['pdf', 'jpg', 'png', 'jpeg', 'gif', 'webp', 'svg'].some((ext) =>
    url.toLowerCase().split('.').includes(ext),
  )
}

function isLinkPreview(tokens: Token[], idx: number): boolean {
  // A link is considered a preview if it's the only thing in the inline context
  // (e.g., a paragraph or list item that only contains this link)
  // In markdown-it, this means the tokens array (children of inline) has exactly 3 tokens:
  // [link_open, text, link_close]
  return (
    tokens.length === 3 &&
    tokens[0].type === 'link_open' &&
    tokens[1].type === 'text' &&
    tokens[2].type === 'link_close'
  )
}

function getHref(tokens: Token[], idx: number): string {
  const href = tokens[idx].attrGet('href')
  if (!href) throw new Error('Href attribute not found')
  return href
}

export default function linkPreviewPlugin(md: MarkdownIt): void {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (
      tokens: Token[],
      idx: number,
      options: any,
      env: StateCore,
      self: any,
    ): string {
      return self.renderToken(tokens, idx, options)
    }

  function hideTokensUntilLinkClose(tokens: Token[], idx: number): void {
    tokens[idx + 1].content = '' // hidden
    for (let i = idx + 1; i < tokens.length; i++) {
      tokens[i].hidden = true
      if (tokens[i].type === 'link_close') break
    }
  }

  md.renderer.rules.link_open = function (
    tokens: Token[],
    idx: number,
    options: any,
    env: StateCore,
    self: any,
  ): string {
    const url = getHref(tokens, idx)

    const isExternal = /^https?:\/\//.test(url)

    if (isExternal && isLinkPreview(tokens, idx) && !isUrlClearlyNotHtml(url)) {
      const title = tokens[idx + 1].content
      hideTokensUntilLinkClose(tokens, idx)

      previewLinkUrls.add(url)

      return `<PreviewLink url="${url}" placeHolderTitle="${title}" />`
    }
    return defaultRender(tokens, idx, options, env, self)
  }
}

export async function createPreviewLinkOGDataJsonFile(): Promise<void> {
  const previewDir = path.resolve(process.cwd(), 'public/json/preview/')

  // Ensure the directory exists
  await fs.promises.mkdir(previewDir, { recursive: true })
  await Promise.allSettled(
    Array.from(previewLinkUrls).map(async (url): Promise<void> => {
      try {
        const hash = fnv1a(url)
        const filePath = path.join(previewDir, `${hash}.json`)

        // if there is a file already, prevent fetching again. but if the file is more than 1 year old, fetch again
        const fileExists = fs.existsSync(filePath)
        if (fileExists) {
          const fileStats = await fs.promises.stat(filePath)
          const fileAge = Date.now() - fileStats.mtime.getTime()

          if (fileAge < oneYearInMs) {
            return
          }
        }

        const ogData = await ogs({ url, timeout }).catch(() =>
          ogs({ url: url.replace('https://', 'http://'), timeout }),
        )

        if (ogData.error) {
          console.error(`OG error for ${url}: ${JSON.stringify(ogData)}`)
          return
        }

        await fs.promises.writeFile(filePath, JSON.stringify(ogData.result))
      } catch (error) {
        console.error(error)
      }
    }),
  )
}
