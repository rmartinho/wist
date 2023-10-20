// Extend Vue's Ref<T> with the ability to revert to an older value
//
// BEWARE: by default this relies on simple JSON.stringify/JSON.parse to perform deep copies
//
// Usage:
//  import { makeRevertable } from 'revert'
//
//  const r = ref(0)
//  const rev = makeRevertable(r)
//  rev.save()
//  console.log(rev.value) // 0
//  rev.value = 1
//  console.log(rev.value) // 1
//  console.log(rev.oldValue) // 0
//  rev.revert()
//  console.log(rev.value) // 0

import { shallowRef, type Ref, computed } from 'vue'

function jsonCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

interface RevertableRef<T> extends Ref<T> {
  revert(): void,
  save(): void,
  get oldValue(): T,
}

export function makeRevertable<T>(r: Ref<T>, copier: (obj: T) => T = jsonCopy): RevertableRef<T> {
  const old = shallowRef(copier(r.value))
  const rev = computed({
    get() {
      return r.value;
    },
    set(newValue: any) {
      r.value = newValue;
    }
  }) as Partial<RevertableRef<T>>;
  Object.assign(rev, {
    revert() {
      r.value = copier(old.value);
    },
    save() { old.value = copier(r.value); },
    get oldValue() {
      return old.value;
    },
  })
  return rev as RevertableRef<T>;
}
