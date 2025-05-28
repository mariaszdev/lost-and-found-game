export interface GameState {
  itemCount: number;
  gameItems: {
    name: string;
    room: string;
    clues: string[];
    clueCount: number;
    guessed: boolean;
    correctGuess?: boolean;
    score: number;
  }[];
  selectedRooms: {
    type: string;
    displayName: string;
    image: string;
    properties: Record<string, number>;
  }[];
}
