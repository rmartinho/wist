import { computed, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

/** An array of all the aspects that denote the principles */
export const principleAspects = ['lantern', 'forge', 'edge', 'winter', 'heart', 'grail', 'moth', 'knock', 'rose', 'nectar', 'scale', 'moon', 'sky'] as const
/** The type of aspects that denote the principles */
export type PrincipleAspect = typeof principleAspects[number]

/** An array of all the aspects that denote the main card types */
export const typeAspects = ['soul', 'skill', 'memory', 'thing', 'room', 'workstation'] as const
/** The type of aspects that denote the main card types */
export type TypeAspect = typeof typeAspects[number]

/** An array of all the aspects that denote wisdoms */
export const wisdomAspects = ['illumination', 'hushery', 'nyctodromy', 'skolekosophy', 'bosk', 'preservation', 'birdsong', 'horomachistry', 'ithastry'] as const
/** The type of aspects that denote wisdoms */
export type WisdomAspect = typeof wisdomAspects[number]

/** An array of all the aspects that denote elements of the soul */
export const soulAspects = ['health', 'chor', 'trist', 'wist', 'phost', 'mettle', 'fet', 'shapt', 'ereb'] as const
/** The type of aspects that denote elements of the soul */
export type SoulAspect = typeof soulAspects[number]
/** An array of all the aspects that denote attunements */
export const attunementAspects = [...soulAspects, 'fulfilled'] as const
/** The type of aspects that denote attunements */
export type AttunementAspect = typeof attunementAspects[number]

/** An object with arrays of the elements of the soul that can be attuned to each wisdom */
export const attunements = {
  illumination: ['phost', 'mettle'],
  horomachistry: ['mettle', 'fet'],
  nyctodromy: ['fet', 'shapt'],
  skolekosophy: ['shapt', 'ereb'],
  bosk: ['ereb', 'health'],
  preservation: ['health', 'chor'],
  birdsong: ['chor', 'trist'],
  hushery: ['trist', 'wist'],
  ithastry: ['wist', 'phost'],
} as Record<WisdomAspect, [SoulAspect, SoulAspect]>

/** An array of all the aspects that denote cleansing skills */
export const cleanseAspects = ['cleanse-infestations', 'cleanse-curses', 'cleanse-corruption', 'cleanse-theoplasma'] as const
/** The type of aspects that denote cleansing skills */
export type CleanseAspect = typeof cleanseAspects[number]

/** An object with arrays of all additional aspects of each main card type  */
export const extraAspects = {
  soul: [],
  skill: ['language', 'chandlery'],
  memory: ['weather', 'omen', 'persistent'],
  thing: ['tool', 'beverage', 'sustenance', 'metal', 'wood', 'fabric', 'candle', 'fuel', 'flower', 'pigment'],
  room: [],
  workstation: [],
} as const
/** The type of the additional aspects for a given card type */
export type ExtraAspects<T extends keyof typeof extraAspects> = Partial<Record<typeof extraAspects[T][number], boolean>>

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

// Workaround for for https://github.com/microsoft/TypeScript/issues/17002
declare global {
  interface ArrayConstructor {
      isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>
  }
}

function asAspectSet(first: AspectSet | string | readonly string[], ...rest: readonly string[]): AspectSet {
  const isArray = Array.isArray(first)
  const isString = typeof first == 'string'
  if (isArray || isString) {
    const array = isArray ? first : rest
    const result = Object.fromEntries(array.map(a => [a, 1]))
    if (isString) {
      result[first] = 1
    }
    return result
  } else {
    return first
  }
}

/**
 * Determines whether an {@link AspectSet} has enough of specific aspects
 * @param aspects The {@link AspectSet} to test
 * @param desired An {@link AspectSet} describing how much of each aspect is desired
 * @returns `true` if {@link aspects} has at least as much of each aspect as {@link desired}
 */
export function hasAllAspects(aspects: AspectSet, desired: AspectSet): boolean

/**
 * Determines whether an {@link AspectSet} has specific aspects
 * @param aspects The {@link AspectSet} to test
 * @param desired An array of desired aspects
 * @returns `true` if {@link aspects} has all aspects in {@link desired}
 */
export function hasAllAspects(aspects: AspectSet, ...desired: string[]): boolean
/**
 * Determines whether an {@link AspectSet} has specific aspects
 * @param aspects The {@link AspectSet} to test
 * @param desired An array of desired aspects
 * @returns `true` if {@link aspects} has all aspects in {@link desired}
 */
export function hasAllAspects(aspects: AspectSet, desired: string[]): boolean

export function hasAllAspects(aspects: AspectSet, desired: AspectSet | string | string[], ...rest: string[]): boolean {
  const testSet = asAspectSet(desired, ...rest)
  return Object.keys(testSet)
    .every(k => aspects[k] >= testSet[k])
}

/**
 * Determines whether an {@link AspectSet} has enough of one out of specific aspects
 * @param aspects The {@link AspectSet} to test
 * @param desired An {@link AspectSet} describing how much of each aspect is desired
 * @returns `true` if {@link aspects} has at least as much of one (non-zero) aspect as {@link desired}
 */
export function hasAnyAspect(aspects: AspectSet, desired: AspectSet): boolean

/**
 * Determines whether an {@link AspectSet} has one out of specific aspects
 * @param aspects The {@link AspectSet} to test
 * @param desired An array of desired aspects
 * @returns `true` if {@link aspects} has one of the aspects in {@link desired}
 */
export function hasAnyAspect(aspects: AspectSet, ...desired: string[]): boolean

export function hasAnyAspect(aspects: AspectSet, desired: AspectSet | string, ...rest: string[]): boolean {
  const testSet = asAspectSet(desired, ...rest)
  return Object.keys(testSet)
    .some(k => aspects[k] >= testSet[k])
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

type StringSubset<T> = Exclude<string, T> | string

/**
 * Creates a reactive string object that sets/unsets a single one out of a group of aspects
 * 
 * @param keys The set of aspects to pick from
 * @param aspects The {@link AspectSet} object to set/unset values in
 * @returns A reactive string that tracks which one of the `keys` in `aspects` is set 
 */
export function useOneOfAspect<T extends StringSubset<T>>(keys: readonly T[], aspects: MaybeRefOrGetter<AspectSet>): Ref<T | undefined> {
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