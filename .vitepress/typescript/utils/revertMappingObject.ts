export default function revertMappingObject<K extends string, V extends string>(
  mappingObject: Record<K, V>,
): Record<V, K> {
  return Object.fromEntries(
    Object.entries(mappingObject).map(([key, value]) => [value, key]),
  ) as Record<V, K>
}
