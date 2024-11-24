import React, { createContext, FC, useContext, useMemo, useState } from "react";
import { drawTiles } from "../utils/game-setup";
import { GameTile, Word } from "../utils/interfaces";
import { getValidWordsFromTiles } from '../utils/game-play';

const DEFAULT_NO_OF_TILES = 7;

interface ContextState {
  selectedTiles: Array<GameTile>;
  validWords: Array<Word>;
  dealNewTiles: () => void;
  numberOfTiles: number;
  setNumberOfTiles: (count: number) => void;
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

  const dealNewTiles = () => {
    const newTiles = drawTiles(numberOfTiles);
    setSelectedTiles(newTiles)
  };
  
  const selectionContext = useMemo(() => {
    return {
      selectedTiles,
      validWords: getValidWordsFromTiles(selectedTiles),
    };
  }, [selectedTiles]);

  return (
    <ScrabbleProviderContext.Provider value={{...selectionContext, dealNewTiles, numberOfTiles, setNumberOfTiles}}>
      {children}
    </ScrabbleProviderContext.Provider>
  );
};
