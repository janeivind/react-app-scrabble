import { describe, expect, test } from "vitest";
import { pointMap } from '../game-setup';
import { wordScore } from '../game-rules';

describe("game-rules", () => {
  test("calculate score on a known letter score", () => {
    const pointLetterA = pointMap.get("D")!;
    const word = "dddd";
    expect(wordScore(word)).toEqual(pointLetterA * word.length);
  });

  test("calculate score on some word", () => {
    expect(wordScore('GUARDIAN')).toEqual(10);
    expect(wordScore('PROPERATE')).toEqual(13);
    expect(wordScore('INDIGO')).toEqual(8);
  });

});
