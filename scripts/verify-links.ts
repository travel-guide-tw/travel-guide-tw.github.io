import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.join(import.meta.dirname, '../docs')

const BLACKLIST_DOMAINS = [
  'pixnet.net',
  'xuite.net',
  'yam.com',
  'blogger.com',
  'blogspot.com',
  'medium.com',
  'facebook.com',
  'instagram.com',
  'youtube.com',
  'tripadvisor.com',
  'backpacker-footprints.com',
  'travelyam.com',
  'walkerland.com.tw',
  'itravelblog.net',
]

function getFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return []
  if (fs.statSync(dir).isFile()) {
    if (dir.endsWith('.md')) fileList.push(dir)
    return fileList
  }
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList)
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath)
    }
  }
  return fileList
}

async function checkUrl(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    })
    return {
      ok: response.status >= 200 && response.status < 400,
      status: response.status,
      reason: response.statusText,
    }
  } catch (error: any) {
    return { ok: false, reason: error.message }
  }
}

async function scan(target: string | undefined) {
  const baseDir = target ? path.resolve(target) : docsDir
  const files = getFiles(baseDir)

  if (files.length === 0) {
    console.log('找不到任何 Markdown 檔案。')
    return
  }

  console.log(`正在檢查 ${files.length} 個檔案的「相關連結」區塊...`)

  let errorCount = 0
  let totalLinks = 0

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')
    const relativePath = path.relative(process.cwd(), file)

    // Find the section by searching for the header "## 相關連結" or "### 相關連結"
    const lines = content.split(/\r?\n/)
    let inSection = false
    let linksInSection: string[] = []

    for (const line of lines) {
      if (line.trim().match(/^#+\s*相關連結/)) {
        inSection = true
        continue
      }
      if (inSection && line.trim().match(/^#+/)) {
        inSection = false
        continue
      }
      if (inSection) {
        const linkMatches = line.matchAll(/\s*\[.*?\]\((https?:\/\/[^\s)]+)\)/g)
        for (const m of linkMatches) {
          linksInSection.push(m[1])
        }
      }
    }

    for (const url of linksInSection) {
      totalLinks++
      let hostname = ''
      try {
        hostname = new URL(url).hostname
      } catch (e) {
        console.log(`[格式錯誤] ${relativePath}: ${url}`)
        errorCount++
        continue
      }

      if (BLACKLIST_DOMAINS.some((domain) => hostname.includes(domain))) {
        console.log(`[黑名單] ${relativePath}: ${url}`)
        errorCount++
      }

      const res = await checkUrl(url)
      if (!res.ok) {
        console.log(
          `[失效] ${relativePath}: ${url} (理由：${res.reason || res.status})`,
        )
        errorCount++
      } else {
        console.log(`[OK] ${relativePath}: ${url}`)
      }
    }
  }

  console.log(`\n掃描完畢。連結總數：${totalLinks}, 問題總數：${errorCount}`)
}

const input = process.argv[2]
if (input && (input.startsWith('http') || input.includes(']('))) {
  const urlMatch = input.match(/https?:\/\/[^\s)]+/) // Corrected regex to avoid trailing parenthesis
  const url = urlMatch ? urlMatch[0] : input
  console.log(`正在檢查單個連結：${url}`)
  checkUrl(url).then((res) => {
    if (res.ok) console.log(`OK (Status: ${res.status})`)
    else console.log(`失敗：${res.reason} (Status: ${res.status || 'N/A'})`)
  })
} else {
  scan(input).catch(console.error)
}
