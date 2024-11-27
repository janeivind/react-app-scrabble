import { findIndex, pullAt, orderBy, clone } from "lodash";
import { wordScore } from "./game-rules";
import { dictionary } from "./game-setup";
import { GameTile, Word } from "./interfaces";

const gameWords = dictionary();

export const getValidWordsFromTiles = (
  tiles: Array<GameTile>,
  max: number = 99999
): Array<Word> => {
  const tileLetters = tiles.map((tile) => tile.letter.toUpperCase());
  let matchingWords: Array<Word> = [];

  console.time("Execution Time");
  const filteredWords = gameWords.filter((word) => word.length <= tiles.length);
  filteredWords.forEach((word) => {
    const testWord = [...word.letters];
    tileLetters.forEach((letter) => {
      const index = findIndex(testWord, (item) => item === letter);
      if (index !== -1) {
        pullAt(testWord, index);
      }
    });
    // If matching word, add to list with the point from drawn tiles
    if (testWord.length === 0) {
      const spellingTiles = clone(tiles);
      const points = wordScore(word.spelling, spellingTiles);
      // Update used word with actual matching tiles, points and ratio
      matchingWords.push({ ...word, points, tiles: spellingTiles });
    }
  });
  console.timeEnd("Execution Time");
  return orderBy(matchingWords, "points", "desc").slice(0, max);
};

export const getHighestScoringWordsWithRatio = (
  tiles: Array<GameTile>,
  scoreRatio: number = 3
): Array<Word> => {
  let matchingWords: Array<Word> = [];

  tiles.forEach((_tile, index) => {
    tiles[index].ratio = scoreRatio;
    const highestScoringWord = getValidWordsFromTiles(tiles, 1);
    const newWord = { ...highestScoringWord[0], tiles: Array.from(tiles) };
    matchingWords.push(newWord);
    tiles[index].ratio = 1;
  });
  return orderBy(matchingWords, "points", "desc");
};
