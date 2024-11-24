import { RadioCards, Text } from "@radix-ui/themes";
import { useGameContext } from 'components/ScrabbleProvider';
import { FC } from "react";

const tileNumberRange = [5, 6, 7, 8, 9, 10];

const NumberOfTiles: FC = () => {
  const { setNumberOfTiles, numberOfTiles } = useGameContext();

  const handleChange = (value: string) => {
    setNumberOfTiles(Number(value));
  };

  return (
    <RadioCards.Root
      defaultValue={numberOfTiles.toString()}
      size="1"
      variant="classic"
      className="ml-3"
      onValueChange={handleChange} 
      columns={tileNumberRange.length.toString()}
    >
      {tileNumberRange.map((selection) => {
        return (
          <RadioCards.Item
            value={selection.toString()}
            style={{
              cursor: "pointer",
            }}
            key={selection}
          >
            <Text weight="bold">{selection}</Text>
          </RadioCards.Item>
        );
      })}
    </RadioCards.Root>
  );
};

export default NumberOfTiles;
