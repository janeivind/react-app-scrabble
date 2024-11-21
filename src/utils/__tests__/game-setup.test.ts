import { describe, expect, test } from "vitest";
import { distributionMap, groupedDistribution, groupedPoints, pointMap } from '../game-setup';

describe("game-setup", () => {


  const allLetters = "abcdefghijklmnopqrstuvwxyz".toUpperCase()

  test("letter points should contain all unique english letters", () => {
    const letterPoints = groupedPoints.flatMap(([letters]) => (letters as string[])).sort().join("");
    expect(letterPoints).toEqual(allLetters);
    expect(pointMap).toHaveLength(allLetters.length)
  });

  test("letter distribution should contain all unique english letters", () => {
    const distributionLetters = groupedDistribution.flatMap(([letters]) => (letters as string[])).sort().join("");
    expect(distributionLetters).toEqual(allLetters);
    expect(distributionMap).toHaveLength(allLetters.length)
  });

});
