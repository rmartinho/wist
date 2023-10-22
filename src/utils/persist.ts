// Extend Vue's Ref<T> with the ability to automatically persist the value
//
// BEWARE: this relies on simple JSON.stringify for persistent
//
// Usage:
//  import { usePersistence } from 'persist'
//
//  const stop = usePersistence(r, 'foo', 0) // load from and persist in localStorage.foo
//  const stop = usePersistence(r, 'bar', window.sessionStorage, 0) // persist in sessionStorage.bar

import { type Ref, watch, type WatchStopHandle } from 'vue'

export function usePersistence<T>(r: Ref<T>, key: string): WatchStopHandle
export function usePersistence<T>(r: Ref<T>, storage: Storage, key: string): WatchStopHandle
export function usePersistence<T>(r: Ref<T>, keyOrStorage: string | Storage, maybeKey?: string): WatchStopHandle {
  const [storage, key] = typeof keyOrStorage == 'string' ? [window.localStorage, keyOrStorage] : [keyOrStorage, maybeKey!]

  return watch(r, () => storage.setItem(key, JSON.stringify(r.value)))
}
