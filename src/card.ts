// A card in Book of Hours

export interface Card {
  id: number,
  name: string,
  aspects: Record<string, number>,
}

export function cardValid(card: Card) {
  return card.name.length > 0 && Object.keys(card.aspects).length > 0
}