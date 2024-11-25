import { render, screen } from "@testing-library/react";
import { drawTiles } from "../../../utils/game-setup";
import * as Tooltip from "@radix-ui/react-tooltip";
import { describe, expect, test } from "vitest";
import { TileBoard } from "../../organisms";
import { Props } from "../TileBoard";
import { ScrabbleProvider } from "components/ScrabbleProvider";
import { FC } from "react";

const WrapperTileBoard: FC<Props> = (props) => {
  return (
    <ScrabbleProvider>
      <Tooltip.Provider>
        <TileBoard {...props} />
      </Tooltip.Provider>
    </ScrabbleProvider>
  );
};

describe("TileBoard", () => {
  const tiles = drawTiles();
  test("renders each tile", () => {
    render(<WrapperTileBoard tiles={tiles} />);
    expect(screen.getAllByTestId("tile").length).toEqual(tiles.length);
  });
});
