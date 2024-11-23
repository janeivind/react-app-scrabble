import { describe, expect, test } from "vitest";
import { gameTiles, drawTiles } from "../game-setup";
import { clone, first, orderBy, pull } from "lodash";
import { GameTile } from "../interfaces";
import {
  getValidWordsFromTiles,
  getHighestScoringWordsWithRatio,
} from "../game-play";

describe("game-play", () => {
  test("get one matching word from random tiles", () => {
    const drawnTiles = drawTiles();
    const matchingWords = getValidWordsFromTiles(drawnTiles, 1);
    expect(matchingWords).toHaveLength(1);
  });

  test("longest valid word that can be formed from the seven tiles", () => {
    const staticTiles = ["R", "B", "E", "T", "V", "H", "G"].map<GameTile>(
      (letter) => gameTiles.find((tile) => tile.letter === letter)!
    );
    const allMatchingWords = getValidWordsFromTiles(staticTiles);
    const longestWord = first(orderBy(allMatchingWords, "length", "desc"));
    expect(longestWord?.spelling).toBe("BERTH");
  });

  test("highest scoring word that can be formed", () => {
    const staticTiles = ["G", "U", "A", "R", "D", "I", "A", "N"].map<GameTile>(
      (letter) => clone(gameTiles.find((tile) => tile.letter === letter)!)
    );
    const allMatchingWords = getValidWordsFromTiles(staticTiles);
    expect(
      allMatchingWords.find((word) => word.spelling === "GUARDIAN")
    ).not.toBe(undefined);
    const highestScoringWord = first(getValidWordsFromTiles(staticTiles, 1));
    expect(highestScoringWord?.spelling).toBe("GUARDIAN");
  });

  test("highest scoring word with any letter scoring three times", () => {
    const staticTiles = [
      "P",
      "R",
      "O",
      "P",
      "E",
      "R",
      "A",
      "T",
      "E",
    ].map<GameTile>(
      (letter) => clone(gameTiles.find((tile) => tile.letter === letter))!
    );
    const allHighScoreWords = getHighestScoringWordsWithRatio(staticTiles);
    expect(allHighScoreWords.length).toBe(staticTiles.length);
  });

});

describe("test matching words", () => {
  const drawnTiles = drawTiles();
  const drawnLetters = drawnTiles.map((tile) => tile.letter);
  const matchingWords = getValidWordsFromTiles(drawnTiles, 5);
  expect(matchingWords).toHaveLength(5);

  test.each(matchingWords)(
    `drawn letters ${drawnLetters.join("-")} matches $spelling`,
    (matchingWord) => {
      expect(pull(matchingWord.letters, ...drawnLetters).length).toEqual(0);
    }
  );
});
