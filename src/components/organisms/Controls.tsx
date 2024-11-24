import { Button, Grid, Text } from "@radix-ui/themes";
import { FC } from "react";
import { NumberOfTiles } from ".";
import { gridStyle } from "./styles";

const Controls: FC = () => {
  return (
    <Grid
      gap="3"
      flow="column"
      columns="auto"
      justify="center"
      align="center"
      style={gridStyle}
    >
      <Button
        size="2"
        style={{
          width: "150px",
          cursor: 'pointer'
        }}
      >
        Deal me
      </Button>
      <NumberOfTiles />
      <Text>tiles.</Text>
    </Grid>
  );
};

export default Controls;
