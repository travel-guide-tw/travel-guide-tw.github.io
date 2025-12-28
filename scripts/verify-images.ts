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
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'TravelGuideTW-Bot/1.0',
      },
      signal: AbortSignal.timeout(10000),
    })
    // Accept 2xx or 3xx (Redirects)
    return response.status >= 200 && response.status < 400
  } catch (error: any) {
    console.log(`  連線錯誤: ${error.message}`)
    return false
  }
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

async function run() {
  const files = getFiles(docsDir)
  console.log(`正在檢查 ${files.length} 個檔案中的圖片連結...`)

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8')
    const imgRegex = /!\[.*?\]\((.*?)\)/g
    let match: RegExpExecArray | null
    let modified = false

    while ((match = imgRegex.exec(content)) !== null) {
      const url = match[1]
      if (url.startsWith('http')) {
        const isValid = await checkUrl(url)
        if (!isValid) {
          console.log(
            `[失效] 在 ${path.relative(process.cwd(), file)} 發現失效圖片: ${url}`,
          )

          // 嘗試修復 Wikimedia 連結
          if (url.includes('wikimedia.org')) {
            const fileNameMatch =
              url.match(/\/commons\/[a-z0-9]+\/[a-z0-9]+\/([^/]+)/) ||
              url.match(/File:(.+)$/)
            if (fileNameMatch) {
              const fileName = decodeURIComponent(fileNameMatch[1])
              console.log(`  嘗試從 Wikimedia API 獲取新連結: ${fileName}`)
              const newUrl = await getWikimediaImageUrl(fileName)
              if (newUrl) {
                console.log(`  成功修復: ${newUrl}`)
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
        `[更新] 已儲存修復後的檔案: ${path.relative(process.cwd(), file)}`,
      )
    }
  }
  console.log('檢查完成。')
}

run()
