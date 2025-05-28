import items from '../data/items.json';
import roomProperties from '../data/roomProperties.json';

type SelectedRoom = {
  type: string;
  displayName: string;
  image: string;
  properties: Record<string, number>;
};

function getItemGrammar(itemName: string): { verb: string; negVerb: string } {
  const found = items.find((i) => i.name === itemName);
  const isPlural = found?.plural ?? false;
  return {
    verb: isPlural ? 'are' : 'is',
    negVerb: isPlural ? 'are not' : 'is not',
  };
}

export function generateClue(
  itemName: string,
  targetRoom: SelectedRoom
): string {
  const { verb } = getItemGrammar(itemName);
  const clues: string[] = [];

  for (const prop of roomProperties) {
    const count = targetRoom.properties[prop.key] ?? 0;
    const label = count === 1 ? prop.singular : prop.plural;
    clues.push(
      `The ${itemName} ${verb} in a room with <strong>${count} ${label}</strong>.`
    );
  }

  return clues[Math.floor(Math.random() * clues.length)];
}
