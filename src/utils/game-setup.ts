import * as fs from "fs";
import * as path from "path";
import { wordScore } from "./game-rules";
import {
  shuffle,
  range,
  compact,
  clone,
  orderBy,
} from "lodash";
import { GameTile, Word } from "./interfaces";

export const groupedPoints: Array<[string[], number]> = [
  [["E", "A", "I", "O", "N", "R", "T", "L", "S", "U"], 1],
  [["D", "G"], 2],
  [["B", "C", "M", "P"], 3],
  [["F", "H", "V", "W", "Y"], 4],
  [["K"], 5],
  [["J", "X"], 8],
  [["Q", "Z"], 10],
];

export const gameTiles = groupedPoints.flatMap<GameTile>(([letters, points]) =>
  letters.map((letter) => ({ letter: letter.toUpperCase(), points, ratio: 1 }))
);

export const groupedDistribution: Array<[string[], number]> = [
  [["E"], 12],
  [["A", "I"], 9],
  [["O"], 8],
  [["N", "R", "T"], 6],
  [["L", "S", "U", "D"], 4],
  [["G"], 3],
  [["B", "C", "M", "P", "F", "H", "V", "W", "Y"], 2],
  [["K", "J", "X", "Q", "Z"], 1],
];

export const distributionMap = groupedDistribution.flatMap<GameTile>(
  ([letters, points]) =>
    letters.map((letter) => ({ letter: letter.toUpperCase(), points, ratio: 1 }))
);

export const tileBag = distributionMap.flatMap<GameTile>((distribution) => {
  const tile = gameTiles.find(
    (item) => item.letter === distribution.letter
  );
  if (tile === undefined) {
    throw new Error(`Tile values not found for letter: ${distribution.letter}`);
  }
  return Array(distribution.points).fill(clone(tile));
});

export const drawTiles = (count: number = 7): Array<GameTile> => {
  const allTiles = tileBag;
  const indexPool: Array<number> = shuffle(range(0, allTiles.length));
  return compact(
    indexPool.slice(0, count).map<GameTile | undefined>((tileNumber) => {
      const tile = allTiles[tileNumber];
      return clone(tile);
    })
  );
};

export const drawTile = (letter: string): GameTile => {
  const tile = tileBag.find((tile) => tile.letter === letter)!;
  return clone(tile);
};

export const getWordTiles = (word: string): Array<GameTile> => {
  return orderBy(
    word.split("").map((letter) => drawTile(letter)),
    "points",
    "desc"
  );
};

const readWordsFromFile = (filePath: string): Array<string> => {
  try {
    const fullPath = path.resolve(filePath);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const words = fileContent
      .split("\n") // Split by whitespace (space, tab, newline, etc.)
      .map((word) => word.trim().toUpperCase()) // Trim each word
      .filter((word) => word.length > 0); // Remove empty strings

    return words;
  } catch (error) {
    console.error("Error reading the file:", error);
    return [];
  }
};

export const dictionary = (): Array<Word> => {
  const words = readWordsFromFile(
    "../react-app-scrabble/src/assets/dictionary.txt"
  );
  const dictonaryWords = words.map((word) => {
    return {
      spelling: word,
      letters: word.split(""),
      length: word.length,
      points: wordScore(word),
      tiles: getWordTiles(word),
    };
  });
  return dictonaryWords;
};

