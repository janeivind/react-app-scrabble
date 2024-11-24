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

  test("shows a loader if set", () => {
    render(<ScoreBoard words={words} loading={true}/>);
    expect(screen.getAllByRole('progressbar')).toBeTruthy(); 
  });

  test("shows a info if no word match", () => {
    render(<ScoreBoard words={[]} />);
    expect(screen.getByText(/No possible matches/)).toBeTruthy(); 
  });
});
