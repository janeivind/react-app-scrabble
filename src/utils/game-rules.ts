import { pullAt } from 'lodash';
import { gameTiles as gameTilesDefault } from "./game-setup";
import { GameTile } from './interfaces';

export const wordScore = (word: string, gameTiles:Array<GameTile> = gameTilesDefault): number => {
  const tileCopy = Array.from(gameTiles);
  // If we override with a given game tile array, use point from this to calculate score
  const useTileScore = gameTiles.length !== gameTilesDefault.length;
  const points: Array<number> = Array.from(word).map(
    (letter) => { 
      const tileIndex = tileCopy.findIndex((item) => item.letter === letter.toUpperCase())
      const gameTile =  tileCopy[tileIndex];
      const points = gameTile ? gameTile.points * gameTile.ratio : 0;
      if (useTileScore) {
        pullAt(tileCopy, tileIndex)
      }
      return points;
    }
  );
  return points.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};
