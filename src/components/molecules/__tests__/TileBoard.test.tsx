import { render, screen } from "@testing-library/react";
import { drawTiles } from "../../../utils/game-setup";
import { describe, expect, test } from "vitest";
import { TileBoard } from '../../organisms';

describe("TileBoard", () => {
  const tiles = drawTiles();
  test("renders each tile", () => {
    render(<TileBoard tiles={tiles} />);
    expect(screen.getAllByTestId('tile').length).toEqual(tiles.length);
  });

});
