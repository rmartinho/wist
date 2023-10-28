/**
 * Symbol for a cloning function
 */
export const Clone = Symbol('clone')

/**
 * An object that has a function to clone itself
 */
export interface Cloneable {
  /**
   * Creates a clone of this object
   */
  [Clone](): this
}

/**
 * Determines whether an object is {@link Cloneable}
 * 
 * @param obj The object to clone 
 * @returns true if {@link obj} is {@link Cloneable}
 */
export function isCloneable(obj: any): obj is Cloneable {
  return typeof obj == 'object' && obj && Clone in obj
}

/**
 * Performs a deep clone of an object
 * 
 * @note For non-{@link Cloneable}s, this relies on {@link JSON.stringify}/{@link JSON.parse parse}
 * 
 * @param obj The object to clone
 * @returns A deep clone of {@link obj}
 * 
 * @example
 * const copy = clone(obj)
 */
export function clone<T>(obj: T): T {
  if (typeof obj == 'undefined') {
    return obj
  }
  if (isCloneable(obj)) {
    return obj[Clone]()
  } else {
    return JSON.parse(JSON.stringify(obj))
  }
}
