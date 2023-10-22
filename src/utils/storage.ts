// Utilities for manipulating WebStorage
//
// Usage:
//  import { parseJsonFromStorage } from 'storage'
//
//  const isNumber = (obj: any): obj is number => typeof obj == 'number'
//  const foo = parseJsonFromStorage(window.localStorage, 'foo', isNumber)

type Validator<T> = (obj: any) => obj is T

function parse(storage: Storage, key: string) {
  const json = storage.getItem(key)
  if (json != null) {
    try {
      return JSON.parse(json)
    } catch (e) {
      return
    }
  }
}

export function parseJsonFromStorage<T>(storage: Storage, key: string, validator: Validator<T>) {
  const parsed = parse(storage, key)
  if (validator(parsed)) {
    return parsed
  } else {
    window.localStorage.removeItem(key)
  }
}