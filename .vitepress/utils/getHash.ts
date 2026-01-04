/**
 * Generates a filename-safe string using URL encoding.
 * Removes protocols (http/https), 'www.', and trailing slashes for cleaner names.
 * Manually escapes characters like '*' that are illegal in Windows filenames.
 */
export default function getHash(url: string): string {
  const cleanUrl = url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')

  let encoded = encodeURIComponent(cleanUrl)

  encoded = encoded
    .replace(/\*/g, '%2A')
    .replace(/\!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\~/g, '%7E')
    .replace(/\./g, '%2E')

  return encoded.substring(0, 250)
}