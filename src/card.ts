// A card in Book of Hours

import { cleanAspectSet, type AspectSet } from '@/aspects'

let id = 0

export interface Card {
  readonly id: number
  name: string
  aspects: AspectSet
}

export function makeCard(name: string): Card {
  return {
    id: id++,
    name,
    aspects: cleanAspectSet(),
  }
}

export function cardValid(card: Card): boolean {
  return card.name.length > 0 && Object.keys(card.aspects).length > 0
}