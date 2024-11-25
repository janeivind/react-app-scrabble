import { render, screen } from "@testing-library/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { drawTiles } from "../../../utils/game-setup";
import { describe, expect, test } from "vitest";
import { ScoreBoard } from "..";
import { getValidWordsFromTiles } from "../../../utils/game-play";
import { Props } from "../ScoreBoard";
import { ScrabbleProvider } from "components/ScrabbleProvider";
import { FC } from "react";

const WrapperScoreBoard: FC<Props> = (props) => {
  return (
    <ScrabbleProvider>
      <Tooltip.Provider>
        <ScoreBoard {...props} />
      </Tooltip.Provider>
    </ScrabbleProvider>
  );
};

describe("ScoreBoard", () => {
  const tiles = drawTiles();
  const words = getValidWordsFromTiles(tiles);

  test("has a header", () => {
    render(<WrapperScoreBoard words={words} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeTruthy();
  });

  test("has a table", () => {
    render(<WrapperScoreBoard words={words} />);
    expect(screen.getByRole("table")).toBeTruthy();
  });

  test("has a row for each word", () => {
    render(<WrapperScoreBoard words={words} />);
    expect(screen.getAllByRole("row").length).toBe(words.length + 1); // Role row includes header
  });

  test("shows a loader if set", () => {
    render(<WrapperScoreBoard words={words} loading={true} />);
    expect(screen.getAllByRole("progressbar")).toBeTruthy();
  });

  test("shows a info if no word match", () => {
    render(<WrapperScoreBoard words={[]} />);
    expect(screen.getByText(/No possible matches/)).toBeTruthy();
  });
});
