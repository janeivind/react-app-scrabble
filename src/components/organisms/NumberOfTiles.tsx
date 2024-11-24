import { RadioCards, Text } from "@radix-ui/themes";
import { FC } from "react";

const tileNumberRange = [5, 6, 7, 8, 9, 10];

const NumberOfTiles: FC = () => {
  return (
    <RadioCards.Root
      defaultValue="7"
      size="1"
      variant="classic"
      className="ml-3"
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
