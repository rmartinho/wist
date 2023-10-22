// Reactive trigger object for Vue
//
// Usage:
//  import { trigger } from 'trigger'
//
//  const t = trigger()
//
//  // effects that depend on the trigger should use it
//  watchEffect(() => t.use())
//
//  // or they can trigger it
//  t.trigger()

import { shallowRef, triggerRef } from 'vue';

export interface Trigger {
  use(): void
  trigger(): void
}

export function trigger(): Trigger {
  const r = shallowRef();
  return Object.assign(r, {
    use() {
      return r.value
    },
    trigger() {
      triggerRef(r)
    },
  })
}