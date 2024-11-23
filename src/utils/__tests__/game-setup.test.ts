import { describe, expect, test } from "vitest";
import {
  distributionMap,
  groupedDistribution,
  groupedPoints,
  gameTiles,
  tileBag,
  drawTiles,
  dictionary,
} from "../game-setup";

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

  test("get default and X random tiles from tile bag", () => {
    expect(drawTiles()).toHaveLength(7);
    expect(drawTiles(5)).toHaveLength(5);
  });

  test("read valid words from file", () => {
    const gameWords = dictionary();
    expect(gameWords.length).toBeGreaterThan(0);
  });
});
