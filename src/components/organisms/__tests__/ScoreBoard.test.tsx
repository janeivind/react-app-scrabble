import { render, screen } from "@testing-library/react";
import { drawTiles } from "../../../utils/game-setup";
import { describe, expect, test } from "vitest";
import { ScoreBoard } from "..";
import { getValidWordsFromTiles } from "../../../utils/game-play";

describe("ScoreBoard", () => {
  const tiles = drawTiles();
  const words = getValidWordsFromTiles(tiles);

  test("has a header", () => {
    render(<ScoreBoard words={words} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeTruthy();
  });
  
  test("has a table", () => {
    render(<ScoreBoard words={words} />);
    expect(screen.getByRole('table')).toBeTruthy();
  });

  test("has a row for each word", () => {
    render(<ScoreBoard words={words} />);
    expect(screen.getAllByRole('row').length).toBe(words.length + 1); // Role row includes header
  });
});
