import { Grid } from "@radix-ui/themes";
import { GameTile } from "../../utils/interfaces";
import { FC } from "react";
import Tile from "components/atoms";
import { TileType } from "components/atoms/tile";

interface Props {
  tiles: Array<GameTile>;
  tileType?: TileType;
}

const TileBoard: FC<Props> = ({ tiles, tileType = "dealer" }) => {
  return (
    <Grid
      gap="3"
      flow="column"
      width=""
      columns={tiles.length.toString()}
      style={{
        width: "fit-content",
      }}
    >
      {tiles.map((tile, index) => {
        return (
          <Tile
            key={`${index}-${tile.letter}`}
            tileType={tileType}
            variant="solid"
            radius="small"
            color="yellow"
            tile={tile}
          />
        );
      })}
    </Grid>
  );
};

export default TileBoard;
