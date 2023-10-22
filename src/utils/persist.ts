// Extend Vue's Ref<T> with the ability to automatically persist the value
//
// BEWARE: by default this relies on simple JSON.stringify/JSON.parse to perform deep copies
//
// Usage:
//  import { usePersistentRef } from 'persist'
//
//  const r = usePersistentRef('r', 0) // load from and persist in localStorage.r
//  const r = usePersistentRef('r', window.sessionStorage, 0) // persist in sessionStorage.r
//  const r = usePersistentRef({ get() {...}, set(value) {...} }) // custom persistence

import { type Ref, computed, ref } from 'vue'

interface PersistentRef<T> extends Ref<T> {
  reload(): void,
  persist(): void,
}

type Persister<T> = {
  load: () => T,
  store: (value: T) => void
}

// TODO also allow not providing default
export function usePersistentRef<T>(key: string): PersistentRef<T | undefined>
export function usePersistentRef<T>(key: string, defaultValue: T): PersistentRef<T>
export function usePersistentRef<T>(key: string, storage: Storage): PersistentRef<T | undefined>
export function usePersistentRef<T>(key: string, storage: Storage, defaultValue: T): PersistentRef<T>
export function usePersistentRef<T>(persister: Persister<T>): PersistentRef<T>

export function usePersistentRef<T>(keyOrPersister: string | Persister<T>, storageOrDefault?: Storage | T, defaultValue?: T): PersistentRef<T> {
  if (typeof keyOrPersister == 'string') {
    const [storage, defValue] = storageOrDefault instanceof Storage ? [storageOrDefault, defaultValue] : [window.localStorage, storageOrDefault]
    return usePersistentRefImpl({
      load() {
        const item = storage.getItem(keyOrPersister)
        if (item) {
          return JSON.parse(item)
        } else {
          return defValue
        }
      },
      store(value: T) {
        storage.setItem(keyOrPersister, JSON.stringify(value))
      }
    })
  } else {
    return usePersistentRefImpl(keyOrPersister)
  }
}

function usePersistentRefImpl<T>(persister: Persister<T>): PersistentRef<T> {
  const r = ref(persister.load()) as Ref<T>
  return Object.assign(computed({
    get() {
      return r.value
    },
    set(value) {
      r.value = value
      persister.store(r.value)
    }
  }), {
    reload() {
      r.value = persister.load()
    },
    persist() {
      persister.store(r.value)
    },
  })
}
