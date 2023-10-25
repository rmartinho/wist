import { type Ref, watch, type WatchStopHandle } from 'vue'

/**
 * Extend {@link Ref} with the ability to automatically persist the value to localStorage
 * 
 * @note this relies on simple JSON.stringify for persistence
 * 
 * @param r The ref whose value is to be persisted
 * @param key The storage key to use for persistence
 * @returns A handle that can be used to stop watching for changes to persist
 * 
 * @example
 * usePersistence(r, 'r', 0)
 * console.log(window.localStorage.r) // 0
 * r.value = 1
 * console.log(window.localStorage.r) // 1
 */
export function usePersistence<T>(r: Ref<T>, key: string): WatchStopHandle

/**
 * Extend {@link Ref} with the ability to automatically persist the value to a {@link Storage} object
 * 
 * @note this relies on simple JSON.stringify for persistence
 * 
 * @param r The ref whose value is to be persisted
 * @param storage The {@link Storage} to use for persistence
 * @param key The storage key to use for persistence
 * @returns A handle that can be used to stop watching for changes to persist
 * 
 * @example
 * usePersistence(r, 'r', window.sessionStorage, 0)
 * console.log(window.sessionStorage.r) // 0
 * r.value = 1
 * console.log(window.sessionStorage.r) // 1
 */
export function usePersistence<T>(r: Ref<T>, storage: Storage, key: string): WatchStopHandle

export function usePersistence<T>(r: Ref<T>, keyOrStorage: string | Storage, maybeKey?: string): WatchStopHandle {
  const [storage, key] = typeof keyOrStorage == 'string' ? [window.localStorage, keyOrStorage] : [keyOrStorage, maybeKey!]

  return watch(r, () => storage.setItem(key, JSON.stringify(r.value)), { immediate: true })
}
