import MarkdownIt, { StateCore, Token } from 'markdown-it'
import ogs from 'open-graph-scraper'
import fs from 'fs'
import path from 'path'
import getHash from '../../utils/getHash'

const previewLinkUrls = new Set<string>()
const oneYearInMs = 365 * 24 * 60 * 60 * 1000
const timeout = 30 * 1000
const CONCURRENCY_LIMIT = 15

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
  if (process.env.VITE_FETCH_LINK_PREVIEW !== 'true') {
    console.log('⏭️ Skipping link preview fetching (VITE_FETCH_LINK_PREVIEW is not true)')
    return
  }
  const previewDir = path.resolve(process.cwd(), 'public/json/preview/')
  await fs.promises.mkdir(previewDir, { recursive: true })

  const urlArray = Array.from(previewLinkUrls)

  for (let i = 0; i < urlArray.length; i += CONCURRENCY_LIMIT) {
    const chunk = urlArray.slice(i, i + CONCURRENCY_LIMIT)

    await Promise.allSettled(
      chunk.map(async (url) => {
        try {
          const hash = getHash(url)
          const filePath = path.join(previewDir, `${hash}.json`)

          if (fs.existsSync(filePath)) {
            const fileStats = await fs.promises.stat(filePath)
            if (Date.now() - fileStats.mtime.getTime() < oneYearInMs) return
          }
          const ogOptions = {
            url,
            timeout,
            fetchOptions: {
              headers: {
                'user-agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
              },
            },
          }

          let ogData = await ogs(ogOptions).catch(() =>
            ogs({ ...ogOptions, url: url.replace('https://', 'http://') }),
          )

          if (ogData.error) {
            console.warn(`⚠️ Timeout/Error for ${url}. Skipping...`)
            return
          }

          await fs.promises.writeFile(filePath, JSON.stringify(ogData.result))
          console.log(`✅ Cached: ${url}`)
        } catch (error) {
          console.error(`❌ Failed ${url}:`, error)
        }
      }),
    )

    // Optional: wait 500ms between batches to look less like a bot
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}
