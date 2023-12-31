import { type Ref, computed, ref } from 'vue'
import { clone } from '@/utils/clone'

/** A reactive object that can be reverted to an old value */
export interface RevertableRef<T> extends Ref<T> {
  /** Reverts this ref to the old value */
  revert(): void,
  /** Saves the current value as the value to revert to, discarding the existing old value */
  save(): void,
  /** The old value that this ref would be reverted to */
  get oldValue(): T,
}

/**
 * Creates a new {@link RevertableRef}
 * 
 * @note by default this relies on simple JSON.stringify/JSON.parse to perform deep copies
 * 
 * @param r The ref for which to enable reverting
 * @param cloner A function that will be used to perform copies 
 * @returns A new revertable ref object
 * 
 * @example
 * const r = ref(0)
 * const rev = useRevertableRef(r)
 * rev.save()
 * console.log(rev.value) // 0
 * rev.value = 1
 * console.log(rev.value) // 1
 * console.log(rev.oldValue) // 0
 * rev.revert()
 * console.log(rev.value) // 0
 */
export function useRevertableRef<T>(r: Ref<T>, cloner: (obj: T) => T = clone): RevertableRef<T> {
  const temp = ref(cloner(r.value)) as Ref<T> // please no nested refs in clones
  return Object.assign(computed({
    get() {
      return temp.value
    },
    set(newValue) {
      temp.value = newValue
    }
  }), {
    revert() {
      temp.value = cloner(r.value)
    },
    save() {
      r.value = cloner(temp.value)
    },
    get oldValue() {
      return r.value
    },
  })
}
