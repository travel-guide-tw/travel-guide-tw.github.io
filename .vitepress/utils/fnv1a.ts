const prime = 0x01000193 // FNV prime
/**
 * FNV-1a hashing algorithm (32-bit).
 * Returns the hash as a hex string.
 * NO external dependencies.
 */
export default function fnv1a(str: string): string {
  let hash = 0x811c9dc5 // FNV offset basis

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, prime)
  }

  // Convert to 32-bit unsigned integer then to hex string
  return (hash >>> 0).toString(16).padStart(8, '0')
}
