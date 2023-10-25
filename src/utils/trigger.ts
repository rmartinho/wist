import { shallowRef, triggerRef } from 'vue'

/** A reactive object without a value that can trigger dependency updates */
export interface Trigger {
  /** Establish a dependency on this trigger object */
  watch(): void

  /**
   * Establish a dependency on this trigger object
   * 
   * A value can be passed and it will be returned; this is a convenience feature
   * 
   * @param value An value that is returns by this function
   * @returns The {@link value}
   */
  watch<T>(value: T): T

  /** Triggers updates for the dependencies of this trigger object */
  trigger(): void
}

/**
 * Creates a {@link Trigger} object 
 * 
 * @returns A new {@link Trigger} object
 * 
 * @example
 * const t = trigger()
 * 
 * //effects that depend on the trigger should watch it
 * watchEffect(() => console.log(t.watch('triggered')))
 * // and other effects can trigger it
 * foo.then(() => t.trigger())
 */
export function trigger(): Trigger {
  const r = shallowRef()
  return Object.assign(r, {
    watch<T>(value?: T): T | undefined {
      r.value
      return value
    },
    trigger() {
      triggerRef(r)
    },
  })
}