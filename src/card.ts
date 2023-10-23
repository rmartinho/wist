// A card in Book of Hours

import { type AspectSet } from './aspects'

export interface Card {
  id: number,
  name: string,
  aspects: AspectSet,
}

export function cardValid(card: Card) {
  return card.name.length > 0 && Object.keys(card.aspects).length > 0
}