/**
 * 從 Wikimedia Commons 獲取圖片的直接下載連結
 *
 * 使用方式：
 * 1. 使用檔案名稱：bun scripts/get-wikimedia-image.ts "File:Example.jpg"
 * 2. 使用完整網址：bun scripts/get-wikimedia-image.ts "https://commons.wikimedia.org/wiki/File:Example.jpg"
 */

async function getWikimediaImageUrl(input: string | undefined) {
  if (!input) {
    console.error('請提供 Wikimedia 檔案名稱或網址')
    process.exit(1)
  }

  let fileName = input

  // 如果輸入是網址，提取檔案名稱
  if (input.includes('wikimedia.org/wiki/File:')) {
    fileName = input.split('File:')[1].split('?')[0]
  }

  // 確保檔名前綴正確
  let title = fileName
  if (!title.startsWith('File:')) {
    title = 'File:' + title
  }

  // 解碼 URL 編碼（以防輸入已經被編碼）
  title = decodeURIComponent(title)

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
        'User-Agent': 'TravelGuideTW/1.0 (https://travel-guide-tw.github.io/)',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (await response.json()) as any
    const pages = data.query.pages
    const pageId = Object.keys(pages)[0]

    if (pageId === '-1') {
      console.error(`找不到檔案：${title}`)
      process.exit(1)
    }

    const imageInfo = pages[pageId].imageinfo
    if (imageInfo && imageInfo.length > 0) {
      const url = imageInfo[0].url

      // 自動檢查圖片網址是否有效
      try {
        const verifyRes = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'TravelGuideTW/1.0',
          },
          signal: AbortSignal.timeout(5000),
        })
        if (verifyRes.ok) {
          console.log(url)
        } else {
          console.error(
            `[無效連結] 獲取的網址回傳狀態碼 ${verifyRes.status}: ${url}`,
          )
          process.exit(1)
        }
      } catch (e: any) {
        console.error(`[連線失敗] 無法驗證獲取的網址 (${e.message}): ${url}`)
        process.exit(1)
      }
    } else {
      console.error(`無法獲取圖片連結：${title}`)
      process.exit(1)
    }
  } catch (error: any) {
    console.error('發生錯誤：', error.message)
    process.exit(1)
  }
}

const input = process.argv[2]
getWikimediaImageUrl(input)
