/**
 * Generates a filename-safe string using URL encoding.
 */
export default function getHash(url: string): string {
  const u = new URL(url)

  return [
    u.hostname,
    u.pathname.replace(/\/+/g, '/').replace(/[\/\\]/g, '_'),
    u.search ? u.search.replace(/[^\w]/g, '_') : '',
  ]
    .filter(Boolean)
    .join('')
}
