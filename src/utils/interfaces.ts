export interface GameTile {
  letter: string;
  points: number;
  ratio: number;
}

export interface Word {
  spelling: string;
  letters: Array<string>;
  length: number;
  points: number;
  tiles: Array<GameTile>
}
