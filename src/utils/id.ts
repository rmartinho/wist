// Unique ID generator
//
// Usage:
//  import { newId } from 'id'
//
//  const id = newId() // "uid-214782374"
//  const prefixedId = newId('prefix-') // "prefix-214782375"

let id = 0

export function newId(prefix: string = 'uid-'): string {
  id++
  return `${prefix}${id}`
}
