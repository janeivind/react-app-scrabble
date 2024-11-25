import { Button, Grid, Text } from "@radix-ui/themes";
import { FC } from "react";
import { NumberOfTiles } from ".";
import { useGameContext } from 'components/ScrabbleProvider';

const Controls: FC = () => {
  const { dealNewTiles } = useGameContext();
  
  const handleButtonClick = () => {
    dealNewTiles();
  };

  return (
    <Grid
      gap="3"
      flow="column"
      columns="auto"
      justify="center"
      align="center"
      width="auto"
    >
      <Button
        size="2"
        style={{
          width: "150px",
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        Deal me
      </Button>
      <NumberOfTiles />
      <Text>tiles.</Text>
    </Grid>
  );
};

export default Controls;
