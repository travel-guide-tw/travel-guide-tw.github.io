import getFilePaths from './getFilePaths'

export default function generateRewrites() {
  const rewrites = Object.fromEntries(
    getFilePaths()
      .map((path) => path.replace('docs/', ''))
      .map((path) => [path, path.replace(/_/g, '')]),
  )

  return rewrites
}
