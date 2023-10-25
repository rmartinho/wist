import { computed, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

/** An array of all the aspects that denote the principles */
export const principleAspects = ['lantern', 'forge', 'edge', 'winter', 'heart', 'grail', 'moth', 'knock', 'rose', 'nectar', 'scale', 'moon', 'sky'] as const
/** The type of aspects that denote the principles */
export type PrincipleAspect = typeof principleAspects[number]

/** An array of all the aspects that denote the main card types */
export const typeAspects = ['soul', 'skill', 'memory', 'readable', 'thing'] as const
/** The type of aspects that denote the main card types */
export type TypeAspect = typeof typeAspects[number]

/** A set of aspects mapped to their values */
export interface AspectSet extends Record<string, number> { }

/**
 * Creates an {@link AspectSet} object
 * 
 * @returns An {@link AspectSet} that automatically cleans up unused aspects
 */
export function makeAspectSet() {
  return new Proxy(<AspectSet>{}, {
    set(obj, prop, value) {
      if (value == 0) {
        return Reflect.deleteProperty(obj, prop)
      } else {
        return Reflect.set(obj, prop, value)
      }
    }
  })
}

/**
 * Creates a reactive object that uses an existing {@link AspectSet} as if it had boolean values
 * 
 * @param aspects The {@link AspectSet} object to set/unset values in
 * @returns A (mutable) view of {@link aspects} that exposes boolean values instead of numbers 
 */
export function useBooleanAspects(aspects: MaybeRefOrGetter<AspectSet>): Ref<Record<string, boolean>> {
  return ref(new Proxy(toValue(aspects), {
    get(obj, prop) {
      return Boolean(Reflect.get(obj, prop))
    },
    set(obj, prop, value) {
      return Reflect.set(obj, prop, Number(value))
    }
  }) as unknown as Record<string, boolean>)
}

/**
 * Creates a reactive string object that sets/unsets a single one out of a group of aspects
 * 
 * @param keys The set of aspects to pick from
 * @param aspects The {@link AspectSet} object to set/unset values in
 * @returns A reactive string that tracks which one of the `keys` in `aspects` is set 
 */
export function useOneOfAspect(keys: readonly string[], aspects: MaybeRefOrGetter<AspectSet>): Ref<string | undefined> {
  const single = computed({
    get() {
      return keys.find(a => toValue(aspects)[a] > 0)
    },
    set(value) {
      const selected = single.value
      if (selected) {
        toValue(aspects)[selected] = 0
      }
      if (value) {
        toValue(aspects)[value] = 1
      }
    },
  })
  return single
}