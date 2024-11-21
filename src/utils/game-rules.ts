import { pointMap } from './game-setup';

export const wordScore = (word: string): number => {
  const points: Array<number> =  Array.from(word).map((letter) => pointMap.get(letter.toUpperCase()) ?? 0);
  return points.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
