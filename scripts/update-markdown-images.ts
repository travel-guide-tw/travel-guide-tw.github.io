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
    // Regex explanation:
    // !\[(.*?)\] - matches the alt text
    // \( - matches the opening parenthesis of the URL
    // ( - start of URL capture group
    //   (?:[^()]+|\([^()]*\))* - matches non-parentheses OR one level of balanced parentheses
    // ) - end of URL capture group
    // \) - matches the closing parenthesis of the URL
    const imgRegex = /!\[(.*?)\]\(((?:[^()]+|\([^()]*\))*)\)/g
    let modified = false

    content = content.replace(imgRegex, (match, alt, url) => {
      const dim = dimensions[url]
      if (dim) {
        modified = true
        return `<img src="${url}" alt="${alt}" width="${dim.width}" height="${dim.height}" style="aspect-ratio: ${dim.width} / ${dim.height};">`
      }
      return match
    })

    if (modified) {
      fs.writeFileSync(file, content)
      console.log(`Updated ${path.relative(process.cwd(), file)}`)
    }
  }
}

run()
