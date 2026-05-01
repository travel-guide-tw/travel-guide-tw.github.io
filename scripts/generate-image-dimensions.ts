import fs from 'node:fs'
import path from 'node:path'
import probe from 'probe-image-size'

const docsDir = path.join(process.cwd(), 'docs')
const outputJson = path.join(process.cwd(), '.vitepress/image-dimensions.json')

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

async function getWikimediaImageInfo(fileName: string) {
  const titles = [
    fileName,
    decodeURIComponent(fileName),
    fileName.replace(/_/g, ' '),
    decodeURIComponent(fileName).replace(/_/g, ' '),
  ]
  const uniqueTitles = Array.from(new Set(titles))

  for (const title of uniqueTitles) {
    const t = title.startsWith('File:') ? title : 'File:' + title
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(t)}&prop=imageinfo&iiprop=url|size&format=json&origin=*`

    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'TravelGuideTW-Bot/1.0' },
      })
      const data = (await response.json()) as any
      if (!data.query?.pages) return null
      const pages = data.query.pages
      const pageId = Object.keys(pages)[0]
      if (pageId !== '-1' && pages[pageId].imageinfo) {
        return pages[pageId].imageinfo[0]
      }
    } catch (e) {}
  }
  return null
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function run() {
  const dimensions: Record<string, { width: number; height: number }> = {}
  if (fs.existsSync(outputJson)) {
    Object.assign(dimensions, JSON.parse(fs.readFileSync(outputJson, 'utf-8')))
  }

  const files = getFiles(docsDir)
  const imageUrls = new Set<string>()
  const imgRegex = /!\[(.*?)\]\(((?:\([^()]*\)|[^()\s])+)\)/g

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')
    for (const match of content.matchAll(imgRegex)) {
      imageUrls.add(match[2])
    }
  }

  console.log(`Found ${imageUrls.size} unique markdown images.`)

  let batchCount = 0
  for (const url of imageUrls) {
    if (dimensions[url]) continue

    console.log(`Processing ${url}...`)

    let isWikimediaUrl = false
    try {
      const parsedUrl = new URL(url)
      const host = parsedUrl.hostname.toLowerCase()
      isWikimediaUrl = host === 'wikimedia.org' || host.endsWith('.wikimedia.org')
    } catch {}

    if (isWikimediaUrl) {
      const fileNameMatch =
        url.match(/\/commons\/[a-z0-9]+\/[a-z0-9]+\/([^/]+)/) ||
        url.match(/File:(.+)$/)
      if (fileNameMatch) {
        const fileName = fileNameMatch[1]
        const info = await getWikimediaImageInfo(fileName)
        if (info) {
          dimensions[url] = { width: info.width, height: info.height }
          console.log(`  Success (API): ${info.width}x${info.height}`)
          fs.writeFileSync(outputJson, JSON.stringify(dimensions, null, 2))
          await sleep(500)
          continue
        }
      }
    }

    try {
      const result = await probe(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        timeout: 10000,
      })
      dimensions[url] = { width: result.width, height: result.height }
      console.log(`  Success (Probe): ${result.width}x${result.height}`)
      fs.writeFileSync(outputJson, JSON.stringify(dimensions, null, 2))
      await sleep(10000) // 10s wait after probe to avoid 429
    } catch (e: any) {
      console.error(`  Failed: ${e.message}`)
      if (e.message.includes('429')) {
        console.log('  Rate limited. Sleeping 30s...')
        await sleep(30000)
      }
    }

    batchCount++
    if (batchCount >= 10) {
      console.log('Stopping turn to avoid timeout. Run again to continue.')
      break
    }
  }

  fs.writeFileSync(outputJson, JSON.stringify(dimensions, null, 2))
  console.log(`Saved. Total: ${Object.keys(dimensions).length}`)
}

run()
