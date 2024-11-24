import React, { createContext, FC, useContext, useMemo, useState } from "react";
import { drawTiles } from "../utils/game-setup";
import { GameTile } from "../utils/interfaces";

const DEFAULT_NO_OF_TILES = 7;

interface ContextState {
  selectedTiles: Array<GameTile>;
  dealNewTiles: () => void;
  numberOfTiles: number;
  setNumberOfTilesToDraw: (count: number) => void;
}

const ScrabbleProviderContext = createContext<ContextState | undefined>(
  undefined
);

export const useGameContext = () => {
  const context = useContext(ScrabbleProviderContext);
  if (!context) {
    throw new Error("useGameContext must be used within a ScrabbleProvider");
  }
  return context;
};

export const ScrabbleProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTiles, setSelectedTiles] = useState<Array<GameTile>>(drawTiles(DEFAULT_NO_OF_TILES));
  const [numberOfTiles, setNumberOfTiles] = useState<number>(DEFAULT_NO_OF_TILES);


  const globalContextValue = useMemo(() => {
    return {
      selectedTiles,
      dealNewTiles: () => {
        const newTiles = drawTiles(numberOfTiles);
        setSelectedTiles(newTiles)
      },
      numberOfTiles,
      setNumberOfTilesToDraw: (count: number) => {
        setNumberOfTiles(count);
      },
    };
  }, [numberOfTiles, selectedTiles]);

  return (
    <ScrabbleProviderContext.Provider value={globalContextValue}>
      {children}
    </ScrabbleProviderContext.Provider>
  );
};
