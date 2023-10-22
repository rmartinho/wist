// A function that performs a deep clone of an object
//
// Usage:
//  import { clone } from 'clone'
//
//  const copy = clone(obj)

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
