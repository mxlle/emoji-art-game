export function dealCards<T>(deck: T[], numOfPlayers: number, cardsPerPlayer: number): T[][] {
  const setsOfCards: T[][] = [];
  for (let i = 0; i < numOfPlayers; i++) {
    setsOfCards.push(drawCards(deck, cardsPerPlayer));
  }
  return setsOfCards;
}

export function drawCards<T>(deck: T[], numOfCards: number): T[] {
  const cards: T[] = [];
  for (let j = 0; j < numOfCards; j++) {
    cards.push(<T>deck.pop());
  }
  return cards;
}
