/**
 * Performs a deep clone of an object
 * 
 * @note This relies on JSON.stringify/parse
 * 
 * @param obj The object to clone
 * @returns A deep clone of {@link obj}
 * 
 * @example
 * const copy = clone(obj)
 */
export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
