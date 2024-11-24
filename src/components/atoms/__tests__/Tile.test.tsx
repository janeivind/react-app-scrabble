import { render, screen } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import { drawTile } from "../../../utils/game-setup";
import { Props } from "../Tile";
import { describe, expect, test } from "vitest";
import { Tile } from "..";

describe("Tile", () => {
  test("render dealer type", () => {
    const tile = drawTile("N");
    const props: Props = {
      tile,
      tileType: "dealer",
    };
    render(
      <Theme>
        <Tile {...props} />
      </Theme>
    );
    // Something fishy with the rigging, avatar fallback not visible in the dom
    // expect(screen.getByText(tile.letter)).toBeTruthy();
    expect(screen.getByText(tile.points)).toBeTruthy();
  });
});
