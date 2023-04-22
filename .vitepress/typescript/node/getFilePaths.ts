import { globSync } from 'glob'

export default function getFilePaths(): string[] {
  return globSync('docs/**/*.md').map((path) => path.replace(/\\/g, '/'))
}
