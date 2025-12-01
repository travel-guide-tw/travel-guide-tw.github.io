import MarkdownIt, { StateCore, Token } from 'markdown-it'
import ogs from 'open-graph-scraper'
import fs from 'fs'
import path from 'path'
import { SuccessResult } from 'open-graph-scraper/types/lib/types'

const previewLinkUrls = new Set<string>()

function isLinkPreview(tokens: Token[], idx: number): boolean {
  const t = tokens[idx + 1]
  return t.type === 'text' && t.content === '@preview'
}

function getHref(tokens: Token[], idx: number): string {
  const hrefIdx = tokens[idx].attrIndex('href')
  if (hrefIdx < 0) throw new Error('Href attribute not found')
  return tokens[idx].attrs![hrefIdx][1]
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
    if (isLinkPreview(tokens, idx)) {
      hideTokensUntilLinkClose(tokens, idx)
      const url = getHref(tokens, idx)

      previewLinkUrls.add(url)

      return `<PreviewLink url="${url}" />`
    } else {
      return defaultRender(tokens, idx, options, env, self)
    }
  }
}

export async function createPreviewLinkOGDataJsonFile(): Promise<void> {
  const results = await Promise.allSettled(
    Array.from(previewLinkUrls).map(
      async (url): Promise<[string, SuccessResult] | null> => {
        const ogData = await ogs({ url })

        if (ogData && ogData.error) {
          console.error(
            `Error fetching Open Graph data for ${url}:`,
            ogData.error,
          )

          return null
        }

        return [url, ogData]
      },
    ),
  )
  const data = Object.fromEntries(
    results
      .filter(
        (res): res is PromiseFulfilledResult<[string, SuccessResult]> =>
          res?.status === 'fulfilled',
      )
      .map(({ value: [url, res] }) => [url, res.result]),
  )

  const filePath = path.resolve(
    process.cwd(),
    'public/json/preview/',
    'previewLinkData.json',
  )

  // Ensure the directory exists
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true })

  await fs.promises.writeFile(filePath, JSON.stringify(data))
  console.log(`Preview link data written to ${filePath}`)
}
