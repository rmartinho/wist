// Aspects from Book of Hours

import { computed, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

export const principleAspects = ['lantern', 'forge', 'edge', 'winter', 'heart', 'grail', 'moth', 'knock', 'rose', 'nectar', 'scale', 'moon', 'sky'] as const
export type PrincipleAspect = typeof principleAspects[number]

export const typeAspects = ['soul', 'skill', 'memory', 'readable', 'thing'] as const
export type TypeAspect = typeof typeAspects[number]

export interface AspectSet extends Record<string, number> { }

export function cleanAspectSet() {
  return new Proxy({}, {
    set(obj: AspectSet, prop, value: number) {
      if (value != 0) {
        return Reflect.set(obj, prop, value);
      } else {
        return Reflect.deleteProperty(obj, prop);
      }
    }
  });
}

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