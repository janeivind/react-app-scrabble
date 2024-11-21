import { shuffle, range, nth, compact } from "lodash";
import { GameTile, pointMap, tileBag } from "./game-setup";

export const wordScore = (word: string): number => {
  const points: Array<number> = Array.from(word).map(
    (letter) => pointMap.get(letter.toUpperCase()) ?? 0
  );
  return points.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

export const getTiles = (count: number = 7): Array<GameTile> => {
  const pickedTileBag = tileBag();
  const indexPool: Array<number> = shuffle(range(0, pickedTileBag.length + 1));
  return compact(
    indexPool
      .slice(0, count)
      .map<GameTile | undefined>((index) => nth(pickedTileBag, index))
  );
};
