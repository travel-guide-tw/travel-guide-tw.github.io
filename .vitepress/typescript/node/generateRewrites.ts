import glob from 'glob'

export default function generateRewrites() {
  const rewrites = Object.fromEntries(
    glob
      .sync('docs/**/*.md')
      .map((path) => path.replace('docs/', ''))
      .map((path) => [path, path.replace(/_/g, '')])
  )

  return rewrites
}
