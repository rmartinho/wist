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

/**
 * Reads and validates an object from an item in {@link Storage} containing a JSON representation
 * 
 * This will remove the item from storage if it does not contain a valid representation
 * 
 * @param storage The {@link Storage} to use
 * @param key The storage key of the item
 * @param validator A function to validate that the JSON represents an object of type {@link T}
 * @returns The object that was found in storage or `undefined` if no valid object was found
 * 
 * @example
 * const isNumber = (obj: any): obj is number => typeof obj == 'number'
 * const n: number = parseJsonFromStorage(window.localStorage, 'n', isNumber)
 */
export function parseJsonFromStorage<T>(storage: Storage, key: string, validator: Validator<T>): T | undefined {
  const parsed = parse(storage, key)
  if (validator(parsed)) {
    return parsed
  } else {
    window.localStorage.removeItem(key)
  }
}