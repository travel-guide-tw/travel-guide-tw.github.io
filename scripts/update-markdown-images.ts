import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.join(process.cwd(), 'docs')
const dimensionsJson = path.join(
  process.cwd(),
  '.vitepress/image-dimensions.json',
)

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

async function run() {
  if (!fs.existsSync(dimensionsJson)) {
    console.error('Dimensions JSON not found. Please run gen:img first.')
    return
  }

  const dimensions = JSON.parse(fs.readFileSync(dimensionsJson, 'utf-8'))
  const files = getFiles(docsDir)

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8')
    let modified = false

    let result = ''
    let i = 0

    while (i < content.length) {
      const start = content.indexOf('![', i)
      if (start === -1) {
        result += content.slice(i)
        break
      }

      result += content.slice(i, start)

      const altEnd = content.indexOf(']', start + 2)
      if (
        altEnd === -1 ||
        altEnd + 1 >= content.length ||
        content[altEnd + 1] !== '('
      ) {
        result += content.slice(start, start + 2)
        i = start + 2
        continue
      }

      const alt = content.slice(start + 2, altEnd)
      let j = altEnd + 2
      let depth = 1

      while (j < content.length && depth > 0) {
        const ch = content[j]
        if (ch === '(') depth++
        else if (ch === ')') depth--
        j++
      }

      if (depth !== 0) {
        result += content.slice(start, start + 2)
        i = start + 2
        continue
      }

      const url = content.slice(altEnd + 2, j - 1)
      const fullMatch = content.slice(start, j)
      const dim = dimensions[url]

      if (dim) {
        modified = true
        result += `<img src="${url}" alt="${alt}" width="${dim.width}" height="${dim.height}" style="aspect-ratio: ${dim.width} / ${dim.height};">`
      } else {
        result += fullMatch
      }

      i = j
    }

    content = result

    if (modified) {
      fs.writeFileSync(file, content)
      console.log(`Updated ${path.relative(process.cwd(), file)}`)
    }
  }
}

run()
