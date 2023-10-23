// Aspects from Book of Hours

import { computed, toValue, type MaybeRef } from 'vue'

export const principleAspects = ['lantern', 'forge', 'edge', 'winter', 'heart', 'grail', 'moth', 'knock', 'rose', 'nectar', 'scale', 'moon', 'sky'] as const
export type PrincipleAspect = typeof principleAspects[number]

export const typeAspects = ['soul', 'skill', 'memory', 'readable', 'thing'] as const
export type TypeAspect = typeof typeAspects[number]

export function useSingleAspect(allowed: readonly string[], aspects: MaybeRef<Record<string, number>>) {
  const single = computed({
    get() {
      return allowed.find(a => toValue(aspects)[a] > 0)
    },
    set(value) {
      const selected = single.value
      if (selected) {
        delete toValue(aspects)[selected]
      }
      if (value) {
        toValue(aspects)[value] = 1
      }
    },
  })
  return single
}