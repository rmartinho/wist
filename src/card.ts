import { makeAspectSet, type AspectSet, hasAnyAspect, principleAspects, typeAspects } from '@/aspects'
import { Clone, clone, type Cloneable } from '@/utils/clone'

/** A Book of Hours card */
export interface Card {
  /** This card's identifier: a number set at creation time, should be unique */
  readonly id: number
  /** This card's name */
  name: string
  /** The aspects of this card */
  aspects: AspectSet
  /** The source of this card */
  source?: string
}

let latestId = 0

/**
 * Creates a new card with a unique ID and an aspects object that clean unused entries automatically 
 * 
 * @param name The card's name
 * @returns A new card with the given name
*/
export function makeCard(options: Partial<Card> = {}): Card & Cloneable {
  if (options.id && options.id > latestId) {
    latestId = options.id
  }
  return {
    id: latestId++,
    name: options.name ?? '',
    aspects: makeAspectSet(options.aspects ?? {}),
    source: options.source,
    [Clone]() { return cloneCard(this) }
  }
}

/**
 * Determines whether a card is valid
 * 
 * In order to be valid a card needs have a name and some aspects
 * 
 * @param card The card to validate
 * @returns `true` if the card is valid; `false` otherwise
 */
export function cardIsValid(card: any): card is Card {
  return typeof card == 'object'
    && typeof card.id == 'number'
    && typeof card.name == 'string'
    && typeof card.aspects == 'object'
    && card.name.length > 0
    && hasAnyAspect(card.aspects, ...principleAspects)
    && hasAnyAspect(card.aspects, ...typeAspects)
}

/**
 * Clones a card
 * 
 * @param card The card to clone
 * @returns a deep clone of {@link card}
 */
export function cloneCard(card: Card): Card & Cloneable {
  return {
    id: clone(card.id),
    name: clone(card.name),
    aspects: makeAspectSet(clone(card.aspects)),
    source: clone(card.source),
    [Clone]() { return cloneCard(this) }
  }
}