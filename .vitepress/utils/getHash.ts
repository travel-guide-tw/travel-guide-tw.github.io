/**
 * Generates a filename-safe string using URL encoding.
 */
export default function getHash(url: string): string {
  const u = new URL(url)

  let filename = [
    u.hostname,
    u.pathname.replace(/\/+/g, '/').replace(/[\/\\]/g, '_'),
    u.search ? u.search.replace(/[^\w]/g, '_') : '',
  ]
    .filter(Boolean)
    .join('')

  const MAX_LENGTH = 100
  if (filename.length > MAX_LENGTH) {
    // Simple hash function (djb2) for browser compatibility
    let hash = 5381
    for (let i = 0; i < filename.length; i++) {
      hash = (hash << 5) + hash + filename.charCodeAt(i) /* hash * 33 + c */
    }
    // Convert to hex string and ensure positive
    const hashStr = (hash >>> 0).toString(16)

    filename = filename.slice(0, MAX_LENGTH) + '_' + hashStr
  }

  return filename
}