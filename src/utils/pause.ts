// Extend Vue's Ref<T> with the ability to pause and resume dependency updates
//
// Usage:
//  import { usePausableRef } from 'pause'
//
//  const p = usePausableRef(ref(0))
//  const c = computed(() => p.value)
//  console.log(c.value) // 0
//  p.value = 1
//  console.log(c.value) // 1
//  p.pause()
//  p.value = 2
//  console.log(c.value) // 1
//  p.resume()
//  console.log(c.value) // 2
//  p.value = 3
//  console.log(c.value) // 3

import { type Ref, customRef, triggerRef } from 'vue'

interface PausableRef<T> extends Ref<T> {
  pause(): void,
  resume(): void,
  get isPaused(): boolean,
}

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
