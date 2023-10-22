// Extend Vue's Ref<T> with the ability to revert to an older value
//
// BEWARE: by default this relies on simple JSON.stringify/JSON.parse to perform deep copies
//
// Usage:
//  import { useRevertableRef } from 'revert'
//
//  const r = ref(0)
//  const rev = useRevertableRef(r)
//  rev.save()
//  console.log(rev.value) // 0
//  rev.value = 1
//  console.log(rev.value) // 1
//  console.log(rev.oldValue) // 0
//  rev.revert()
//  console.log(rev.value) // 0

import { shallowRef, type Ref, computed } from 'vue'
import { clone } from './clone';

interface RevertableRef<T> extends Ref<T> {
  revert(): void,
  save(): void,
  get oldValue(): T,
}

export function useRevertableRef<T>(r: Ref<T>, cloner: (obj: T) => T = clone): RevertableRef<T> {
  const old = shallowRef(cloner(r.value))
  return Object.assign(computed({
    get() {
      return r.value;
    },
    set(newValue) {
      r.value = newValue;
    }
  }), {
    revert() {
      r.value = cloner(old.value);
    },
    save() {
      old.value = cloner(r.value);
    },
    get oldValue() {
      return old.value;
    },
  });
}
