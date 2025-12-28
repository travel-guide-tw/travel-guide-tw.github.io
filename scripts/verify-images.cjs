const fs = require('fs')
const path = require('path')
const https = require('https')

const docsDir = path.join(__dirname, '../docs')

function getFiles(dir, fileList = []) {
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

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      {
        headers: { 'User-Agent': 'TravelGuideTW-Bot/1.0' },
        timeout: 10000,
      },
      (res) => {
        // 接受 2xx 或 3xx (重新導向)
        resolve(res.statusCode >= 200 && res.statusCode < 400)
      },
    )
    req.on('error', (err) => {
      console.log(`  連線錯誤: ${err.message}`)
      resolve(false)
    })
    req.on('timeout', () => {
      req.destroy()
      console.log(`  連線逾時`)
      resolve(false)
    })
    req.end()
  })
}

async function getWikimediaImageUrl(fileName) {
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

  return new Promise((resolve) => {
    https
      .get(
        apiUrl,
        {
          headers: { 'User-Agent': 'TravelGuideTW-Bot/1.0' },
          timeout: 10000,
        },
        (res) => {
          let data = ''
          res.on('data', (chunk) => (data += chunk))
          res.on('end', () => {
            try {
              const json = JSON.parse(data)
              const pages = json.query.pages
              const pageId = Object.keys(pages)[0]
              if (pageId !== '-1' && pages[pageId].imageinfo) {
                resolve(pages[pageId].imageinfo[0].url)
              } else {
                resolve(null)
              }
            } catch (e) {
              resolve(null)
            }
          })
        },
      )
      .on('error', () => resolve(null))
      .on('timeout', () => {
        resolve(null)
      })
  })
}

async function run() {
  const files = getFiles(docsDir)
  console.log(`正在檢查 ${files.length} 個檔案中的圖片連結...`)

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8')
    const imgRegex = /!\[.*?\]\((.*?)\)/g
    let match
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
                // 安全地替換 URL，避免正則表達式特殊字元影響
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
