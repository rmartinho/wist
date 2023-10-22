// Unique ID generator
//
// Usage:
//  import { newId } from 'id'
//
//  const id = useId() // "uid-214782374"
//  const prefixedId = useId('prefix-') // "prefix-214782375"

let id = 0

export function useId(prefix: string = 'uid-'): string {
  id++
  return `${prefix}${id}`
}
