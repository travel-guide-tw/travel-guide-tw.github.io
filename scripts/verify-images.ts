import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.join(import.meta.dirname, '../docs')

function getFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList)
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath)
    }
  })
  return fileList
}

async function checkUrl(url: string): Promise<boolean> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'image/*',
          'User-Agent': 'TravelGuideTW-Bot/1.0',
        },
        signal: AbortSignal.timeout(10000),
      })
      // Accept 2xx or 3xx (Redirects); retry Wikimedia rate limits briefly.
      if (response.status === 429 && attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        continue
      }
      if (response.status >= 400) {
        console.log(`  HTTP 回應：${response.status}`)
        return false
      }
      const contentType = response.headers.get('content-type')?.toLowerCase()
      if (!contentType?.startsWith('image/')) {
        console.log(`  非圖片回應：${contentType ?? 'missing Content-Type'}`)
        return false
      }
      return true
    } catch (error: any) {
      if (attempt === 2) {
        console.log(`  連線錯誤：${error.message}`)
        return false
      }
    }
  }
  return false
}

async function getWikimediaImageUrl(fileName: string): Promise<string | null> {
  const title = fileName.startsWith('File:') ? fileName : 'File:' + fileName
  const params = new URLSearchParams({
    action: 'query',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  })

  const apiUrl = `https://commons.wikimedia.org/w/api.php?${params.toString()}`

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'TravelGuideTW-Bot/1.0',
      },
      signal: AbortSignal.timeout(10000),
    })
    const data = (await response.json()) as any
    const pages = data.query.pages
    const pageId = Object.keys(pages)[0]
    if (pageId !== '-1' && pages[pageId].imageinfo) {
      return pages[pageId].imageinfo[0].url
    }
    return null
  } catch (e) {
    return null
  }
}

function getMarkdownImageUrls(content: string): string[] {
  const urls: string[] = []
  let searchStart = 0

  while (true) {
    const imageStart = content.indexOf('![', searchStart)
    if (imageStart === -1) break

    const labelEnd = content.indexOf(']', imageStart + 2)
    const openParen = labelEnd === -1 ? -1 : content.indexOf('(', labelEnd)
    if (openParen === -1) {
      searchStart = imageStart + 2
      continue
    }

    let depth = 1
    let end = openParen + 1
    while (end < content.length && depth > 0) {
      if (content[end] === '(') depth++
      if (content[end] === ')') depth--
      end++
    }
    if (depth !== 0) break

    const destination = content.slice(openParen + 1, end - 1)
    urls.push(destination.trim().replace(/\s+"[^"]*"$/, ''))
    searchStart = end
  }

  return urls
}

async function run(targetDir?: string) {
  const baseDir = targetDir ? path.resolve(targetDir) : docsDir
  const files = getFiles(baseDir)
  console.log(`正在檢查 ${files.length} 個檔案中的圖片連結...`)

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8')
    const imageUrls = getMarkdownImageUrls(content)
    const htmlImageRegex = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi
    let htmlMatch: RegExpExecArray | null
    while ((htmlMatch = htmlImageRegex.exec(content)) !== null) {
      imageUrls.push(htmlMatch[1])
    }
    let modified = false

    for (const url of imageUrls) {
      if (url.startsWith('http')) {
        const isValid = await checkUrl(url)
        if (!isValid) {
          console.log(
            `[失效] 在 ${path.relative(process.cwd(), file)} 發現失效圖片：${url}`,
          )

          // 嘗試修復 Wikimedia 連結
          let isWikimediaUrl = false
          let parsed: URL | null = null
          try {
            parsed = new URL(url)
            const hostname = parsed.hostname.toLowerCase()
            isWikimediaUrl =
              hostname === 'wikimedia.org' ||
              hostname.endsWith('.wikimedia.org')
          } catch {
            isWikimediaUrl = false
          }
          if (isWikimediaUrl && parsed) {
            const fileNameMatch =
              parsed.pathname.match(/\/wiki\/File:(.+)$/i) ??
              parsed.pathname.match(
                /\/commons\/(?:(thumb)\/)?[a-z0-9]+\/[a-z0-9]+\/(?:[^/]+\/)?([^/]+)$/,
              )
            if (fileNameMatch) {
              const isFilePage = fileNameMatch[0].includes('/wiki/File:')
              const fileName = decodeURIComponent(
                isFilePage ? `File:${fileNameMatch[1]}` : fileNameMatch[2],
              )
              const normalizedFileName =
                !isFilePage && fileNameMatch[1]
                  ? fileName.replace(/^\d+px-/, '')
                  : fileName
              console.log(`  嘗試從 Wikimedia API 獲取新連結：${fileName}`)
              const newUrl = await getWikimediaImageUrl(normalizedFileName)
              if (newUrl) {
                console.log(`  成功修復：${newUrl}`)
                const escapedUrl = url.replace(/[.*+?^${}()|[\\]/g, '\\$&')
                content = content.replace(new RegExp(escapedUrl, 'g'), newUrl)
                modified = true
              } else {
                console.log(`  無法修復：找不到對應的 Wikimedia 檔案`)
              }
            }
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(file, content)
      console.log(
        `[更新] 已儲存修復後的檔案：${path.relative(process.cwd(), file)}`,
      )
    }
  }
  console.log('檢查完成。')
}

const input = process.argv[2]
run(input)
