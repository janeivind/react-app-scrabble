import { describe, expect, test } from "vitest";
import { gameTiles } from '../game-setup';
import {  wordScore } from '../game-rules';
import { GameTile } from '../interfaces';
import { clone } from 'lodash';

describe("game-rules", () => {
  test("calculate score on a known letter score", () => {
    const pointLetter = gameTiles.find((tile) => tile.letter === "D")?.points!;
    const word = "dddd";
    expect(wordScore(word)).toEqual(pointLetter * word.length);
  });

  test("calculate score on some words", () => {
    expect(wordScore('GUARDIAN')).toEqual(10);
    expect(wordScore('PROPERATE')).toEqual(13);
    expect(wordScore('INDIGO')).toEqual(8);
  });


  test("calculate score with score ratio on tiles", () => {
    const word = "GUARDIAN"
    const staticTiles = word.split("").map<GameTile>(
      (letter) => clone(gameTiles.find((tile) => tile.letter === letter)!)
    );
    expect(wordScore(word, staticTiles)).toEqual(10);
    
    // Third letter A is x3, but ony count this once
    staticTiles[2].ratio = 3;
    const tileSum = staticTiles.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.points * currentValue.ratio),
      0
    );
    console.log(staticTiles)
    expect(wordScore(word, staticTiles)).toEqual(tileSum);
  });
});
