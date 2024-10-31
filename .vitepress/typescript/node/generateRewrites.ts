import getFilePaths from './getFilePaths'

export default function generateRewrites() {
  return Object.fromEntries(
    getFilePaths().map((path) => [
      path,
      path.replace('docs/', '').replace(/_/g, ''),
    ]),
  )
}
