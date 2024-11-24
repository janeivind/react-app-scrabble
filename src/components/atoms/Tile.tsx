import { Avatar, AvatarProps } from "@radix-ui/themes";
import { GameTile } from "../../utils/interfaces";
import { FC } from "react";
import { Responsive } from "@radix-ui/themes/props";

export type TileType = "dealer" | "result";

export interface Props extends Omit<AvatarProps, "fallback"> {
  tile: GameTile;
  tileType: TileType;
}

const tileStyle: React.CSSProperties = {
  position: "relative",
};

const pointStyleBase: React.CSSProperties = {
  position: "absolute",
  color: "var(--accent-contrast)",
};

const pointStyleDealer: React.CSSProperties = {
  bottom: "0.2rem",
  right: "0.5rem",
  fontSize: "1rem",
};

const pointStyleResult: React.CSSProperties = {
  bottom: "-0.2rem",
  right: "0.2rem",
  fontSize: "0.4rem",
};

const Tile: FC<Props> = ({ tile, tileType, ...rest }) => {
  const size: Responsive<"2" | "6"> = tileType === "result" ? "2" : "6";
  const resultFontSize = size === "2" ? pointStyleResult : pointStyleDealer;
  return (
    <div style={tileStyle} data-testid="tile">
      <Avatar size={size} {...rest} fallback={tile.letter} />
      <div style={{ ...pointStyleBase, ...resultFontSize }}>{tile.points}</div>
    </div>
  );
};

export default Tile;
