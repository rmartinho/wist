import { makeAspectSet, type AspectSet } from '@/aspects'

/**
 * A definition of an in-game slot
 */
export interface Slot {
  /** This slot requires all of these aspects */
  allOf: AspectSet
  /** This slot requires at least one of these aspects */
  oneOf: AspectSet
  /** This slot requires none of these aspects */
  noneOf: AspectSet
}

function hasAllOf(aspects: AspectSet, allOf: AspectSet): boolean {
  return Object.keys(allOf).every(a => (aspects[a] ?? 0) >= allOf[a])
}

function hasOneOf(aspects: AspectSet, oneOf: AspectSet): boolean {
  return Object.values(oneOf).every(n => n == 0) || Object.keys(oneOf).some(a => (aspects[a] ?? 0) >= oneOf[a])
}

function hasNoneOf(aspects: AspectSet, noneOf: AspectSet): boolean {
  return Object.keys(noneOf)
    .filter(a => noneOf[a] > 0)
    .every(a => (aspects[a] ?? 0) < noneOf[a])
}

/**
 * Determines whether an {@link AspectSet} can fit into a given {@link Slot}
 * 
 * @param aspects The aspects to test
 * @param slot The slot to test against
 * @returns true if the {@link aspects} match the {@link slot}
 */
export function matchesSlot(aspects: AspectSet, slot: Slot): boolean {
  return hasAllOf(aspects, slot.allOf) && hasOneOf(aspects, slot.oneOf) && hasNoneOf(aspects, slot.noneOf)
}

export function makeSlot(): Slot {
  return {
    allOf: makeAspectSet(),
    oneOf: makeAspectSet(),
    noneOf: makeAspectSet(),
  }
}
