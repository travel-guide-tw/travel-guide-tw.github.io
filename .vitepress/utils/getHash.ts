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

  return encodeURIComponent(cleanUrl)
    .replace(/\*/g, '%2A') // Illegal on Windows
    .replace(/\./g, '%2E') // Avoid extension confusion
    .substring(0, 250)
}