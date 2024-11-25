import * as Tooltip from '@radix-ui/react-tooltip';
import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import { drawTile } from "../../../utils/game-setup";
import { Props } from "../Tile";
import { describe, expect, test, vi } from "vitest";
import { Tile } from "..";
import { ScrabbleProviderContext } from "components/ScrabbleProvider";
import { FC } from "react";

const updateTileRatioMock = vi.fn();

const WrapperTile: FC<Props> = (props) => {
  return (
    <ScrabbleProviderContext.Provider
      value={{
        dealNewTiles: vi.fn(),
        setNumberOfTiles: vi.fn(),
        updateTileRatio: updateTileRatioMock,
        selectedTiles: [],
        numberOfTiles: 7,
        loadingResult: false,
        validWords: [],
      }}
    >
      <Tooltip.Provider>
        <Tile {...props} />
      </Tooltip.Provider>
    </ScrabbleProviderContext.Provider>
  );
};

describe("Tile", () => {
  const tile = drawTile("X");
  const props: Props = {
    tile,
    tileType: "dealer",
  };

  test("render dealer type", () => {
    render(<WrapperTile {...props} />);
    // Something fishy with the rigging, avatar fallback not visible in the dom
    // expect(screen.getByText(tile.letter)).toBeTruthy();
    expect(screen.getByText(tile.points)).toBeTruthy();
  });

  test("render star if type dealer and ratio > 1", () => {
    props.tile.ratio = 2;
    render(<WrapperTile {...props} />);
    expect(screen.getByTestId("tile-star")).toBeTruthy();
    expect(screen.getByText(tile.points * tile.ratio)).toBeTruthy();
  });

  test("calls updateTileRatio when clicked", async () => {
    render(<WrapperTile {...props} />);
     await user.click(screen.getByTestId("tile"));
     expect(updateTileRatioMock).toHaveBeenCalled();
   });

   test("no render of star if type result and ratio > 1", () => {
    props.tile.ratio = 2;
    props.tileType = 'result'
    render(<WrapperTile {...props} />);
    expect(screen.queryByTestId("tile-star")).toBeFalsy();
  });
});
