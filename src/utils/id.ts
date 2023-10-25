let id = 0

/**
 * Generates a unique ID
 * 
 * @param prefix The prefix to be used for the ID; defaults to `'uid-'`
 * @returns A unique string ID
 * 
 * @example
 * const id = useId() // "uid-14"
 * const prefixedId = useId('prefix-') // "prefix-15"
 */
export function useId(prefix: string = 'uid-'): string {
  id++
  return `${prefix}${id}`
}
