import { makeAspectSet, type AspectSet } from '@/aspects'

/** A Book of Hours card */
export interface Card {
  /** This card's identifier: a number set at creation time, should be unique */
  readonly id: number
  /** This card's name */
  name: string
  /** The aspects of this card */
  aspects: AspectSet
}

let id = 0

/**
 * Creates a new card with a unique ID and an aspects object that clean unused entries automatically 
 * 
 * @param name The card's name
 * @returns A new card with the given name
*/
export function makeCard(name: string): Card {
  return {
    id: id++,
    name,
    aspects: makeAspectSet(),
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
export function cardValid(card: Card): boolean {
  return card.name.length > 0 && Object.keys(card.aspects).length > 0
}