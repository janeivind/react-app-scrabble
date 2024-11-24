import { Grid } from "@radix-ui/themes";
import { GameTile } from "../../utils/interfaces";
import { FC } from "react";
import Tile from 'components/atoms';
import { gridStyle } from '../../app/styles';

interface Props {
  tiles: Array<GameTile>;
}

const TileBoard: FC<Props> = ({ tiles }) => {
  return (
    <Grid gap="3" flow="column" width="" columns={tiles.length.toString()} style={gridStyle} justify="center">
      {tiles.map((tile, index) => {
        return (<Tile key={`${index}-${tile.letter}`} variant="solid" radius="small" color="yellow" size="6" tile={tile} />);
      })}
    </Grid>
  );
};

export default TileBoard;
