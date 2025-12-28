const fs = require('fs')
const path = require('path')

const docsDir = path.join(__dirname, '../docs')

// 黑名單：常見的個人部落格、心得分享網站、社群平台
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

// 建議的官方域名關鍵字
const OFFICIAL_KEYWORDS = [
  '.gov',
  '.lg.jp',
  '.or.jp',
  'japan.travel',
  'jnto',
  'shizuoka-guide.com',
  'fujisan-climb.jp',
]

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return []
  if (fs.statSync(dir).isFile()) {
    if (dir.endsWith('.md')) fileList.push(dir)
    return fileList
  }
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

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (response.ok) {
      return { ok: true, status: response.status }
    } else {
      return { ok: false, status: response.status, reason: response.statusText }
    }
  } catch (error) {
    return { ok: false, reason: error.message }
  }
}

async function scan(target) {
  let files = []
  if (!target) {
    files = getFiles(docsDir)
  } else {
    files = getFiles(target)
  }

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

    const sectionMatch = content.match(/## 相關連結([\s\S]*?)(?=\n##|$)/)
    if (!sectionMatch) continue

    const linksSection = sectionMatch[1]
    const linkRegex = /.*?\[.*?\]\((https?:\/\/.*?)\)/g
    let match

    while ((match = linkRegex.exec(linksSection)) !== null) {
      totalLinks++
      const url = match[1]

      const hostname = new URL(url).hostname
      const isBlacklisted = BLACKLIST_DOMAINS.some((domain) =>
        hostname.includes(domain),
      )

      if (isBlacklisted) {
        console.log(`[非官方] ${relativePath}: ${url}`)
        errorCount++
      }

      const isLikelyOfficial =
        OFFICIAL_KEYWORDS.some((kw) => hostname.includes(kw)) ||
        hostname.endsWith('.jp')

      const fetchResult = await checkUrl(url)
      if (!fetchResult.ok) {
        console.log(
          `[失效] ${relativePath}: ${url} (理由: ${fetchResult.reason})`,
        )
        errorCount++
      } else {
        if (isLikelyOfficial) {
          console.log(`[OK] ${relativePath}: ${url}`)
        } else {
          console.log(`[OK (非預設官方)] ${relativePath}: ${url}`)
        }
      }
    }
  }

  console.log(`\n掃描完畢。連結總數: ${totalLinks}, 問題總數: ${errorCount}`)
}

const input = process.argv[2]

if (input && (input.startsWith('http') || input.includes(']('))) {
  // 處理單個連結
  const mdMatch = input.match(/.*?\[.*?\]\((https?:\/\/.*?)\)/)
  const url = mdMatch ? mdMatch[1] : input

  console.log(`正在檢查單個連結: ${url}`)
  checkUrl(url)
    .then((res) => {
      if (res.ok) console.log(`OK (Status: ${res.status})`)
      else console.log(`失敗: ${res.reason} (Status: ${res.status || 'N/A'})`)
    })
    .catch(console.error)
} else {
  // 處理檔案或目錄
  scan(input).catch(console.error)
}
