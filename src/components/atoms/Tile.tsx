import { Avatar, AvatarProps, Box, Tooltip } from "@radix-ui/themes";
import { GameTile } from "../../utils/interfaces";
import { FC } from "react";
import { Responsive } from "@radix-ui/themes/props";
import { useGameContext } from "components/ScrabbleProvider";
import { TileStar } from ".";

export type TileType = "dealer" | "result";

export interface Props extends Omit<AvatarProps, "fallback"> {
  tile: GameTile;
  tileType: TileType;
  tileIndex?: number;
}

const tileStyle: React.CSSProperties = {
  position: "relative",
  cursor: "pointer",
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

const starStyle: React.CSSProperties = {
  position: "absolute",
  top: "0px",
  right: "0px",
};

const Tile: FC<Props> = ({ tile, tileType, tileIndex = 0, ...rest }) => {
  const { updateTileRatio } = useGameContext();

  const handleClick = () => {
    updateTileRatio(tileIndex);
  };

  const size: Responsive<"2" | "6"> = tileType === "result" ? "2" : "6";
  const resultFontSize = size === "2" ? pointStyleResult : pointStyleDealer;
  const tooltipText =
    tile.ratio < 3
      ? "Click  to enhance point ratio"
      : "Click to reset point ratio";
  return (
    <Tooltip content={tooltipText}>
      <Box style={tileStyle} data-testid="tile" onClick={handleClick}>
        <Avatar size={size} {...rest} fallback={tile.letter} />
        <Box style={{ ...pointStyleBase, ...resultFontSize }}>
          {tile.points * tile.ratio}
        </Box>
        {tileType === "dealer" && tile.ratio > 1 && (
          <Box style={starStyle}>
            <TileStar number={tile.ratio} />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};

export default Tile;
