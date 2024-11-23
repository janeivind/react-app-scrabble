import { describe, expect, test } from "vitest";
import {
  distributionMap,
  gameWords,
  groupedDistribution,
  groupedPoints,
  gameTiles,
  tileBag,
  getHighestScoringWordsWithRatio,
} from "../game-setup";
import { clone, first, orderBy, pull } from "lodash";
import { GameTile } from "../interfaces";

describe("game-setup", () => {
  const allLetters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

  test("letter points should contain all unique english letters", () => {
    const letterPoints = groupedPoints
      .flatMap(([letters]) => letters as string[])
      .sort()
      .join("");
    expect(letterPoints).toEqual(allLetters);
    expect(gameTiles).toHaveLength(allLetters.length);
  });

  test("letter distribution should contain all unique english letters", () => {
    const distributionLetters = groupedDistribution
      .flatMap(([letters]) => letters as string[])
      .sort()
      .join("");
    expect(distributionLetters).toEqual(allLetters);
    expect(distributionMap).toHaveLength(allLetters.length);
  });

  test("tile bag should countain all distributions of letters", () => {
    const tileCount = groupedDistribution.reduce(
      (totalCount, [letters, count]) => {
        return totalCount + letters.length * count;
      },
      0
    );
    expect(tileCount).toEqual(tileBag.length);
  });

  test("get X random tiles from tile bag", () => {
    expect(drawTiles()).toHaveLength(7);
    expect(drawTiles(5)).toHaveLength(5);
  });

  test("read valid words from file", () => {
    expect(gameWords.length).toBeGreaterThan(0);
  });

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
    expect(allMatchingWords.length).toBe(27);
    const longestWord = first(orderBy(allMatchingWords, "length", "desc"));
    expect(longestWord?.spelling).toBe("BERTH");
  });

  test("highest scoring word that can be formed", () => {
    const staticTiles = ["G", "U", "A", "R", "D", "I", "A", "N"].map<GameTile>(
      (letter) => clone(gameTiles.find((tile) => tile.letter === letter)!)
    );
    const allMatchingWords = getValidWordsFromTiles(staticTiles);
    expect(allMatchingWords.length).toBe(124);
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
    console.log(allHighScoreWords[0]);
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
});
