import { Avatar, AvatarProps } from "@radix-ui/themes";
import { GameTile } from "../../utils/interfaces";
import { FC } from "react";

interface Props extends Omit<AvatarProps, "fallback"> {
  tile: GameTile;
}

const tileStyle: React.CSSProperties = {
  position: "relative",
};

const pointStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "5px",
  right: "10px",
  color: "black"
};

const Tile: FC<Props> = ({ tile, ...rest }) => {
  return (
    <div style={tileStyle}>
      <Avatar {...rest} fallback={tile.letter}/>
      <div style={pointStyle}>{tile.points}</div>
    </div>
  );
};

export default Tile;
