import { type Ref, customRef, triggerRef } from 'vue'

/** A reactive object that can pause/resume dependency updates */
export interface PausableRef<T> extends Ref<T> {
  /** Pauses dependency updates for this ref */
  pause(): void,
  /** Resumes dependency updates for this ref */
  resume(): void,
  /** Returns whether dependency updates for this ref are paused or not */
  get isPaused(): boolean,
}

/**
 * Creates a new {@link PausableRef}
 * 
 * @param r The {@link Ref} to watch
 * @returns A pausable ref object
 * 
 * @example
 * const p = usePausableRef(ref(0))
 * const c = computed(() => p.value)
 * console.log(c.value) // 0
 * p.value = 1
 * console.log(c.value) // 1
 * p.pause()
 * p.value = 2
 * console.log(c.value) // 1
 * p.resume()
 * console.log(c.value) // 2
 * p.value = 3
 * console.log(c.value) // 3
 */
export function usePausableRef<T>(r: Ref<T>): PausableRef<T> {
  let paused = false
  let changed = false
  return Object.assign(customRef((track, trigger) => ({
    get() {
      track()
      return r.value
    },
    set(value) {
      r.value = value
      changed = true
      if (!paused) {
        trigger()
      }
    }
  })), {
    pause() {
      paused = true
      changed = false
    },
    resume() {
      paused = false
      if (changed) {
        triggerRef(this as PausableRef<T>)
      }
    },
    get isPaused() {
      return paused
    },
  })
}
