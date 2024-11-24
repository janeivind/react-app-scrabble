import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { drawTiles } from "../utils/game-setup";
import { GameTile, Word } from "../utils/interfaces";
import { getValidWordsFromTiles } from "../utils/game-play";

const DEFAULT_NO_OF_TILES = 7;

interface ContextState {
  selectedTiles: Array<GameTile>;
  validWords: Array<Word>;
  loadingResult: boolean;
  numberOfTiles: number;
  setNumberOfTiles: (count: number) => void;
  dealNewTiles: () => void;
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
  const [selectedTiles, setSelectedTiles] = useState<Array<GameTile>>(
    drawTiles(DEFAULT_NO_OF_TILES)
  );
  const [numberOfTiles, setNumberOfTiles] =
    useState<number>(DEFAULT_NO_OF_TILES);
  const [validWords, setValidWords] = useState<Array<Word>>([]);
  const [loadingResult, setLoadingResult] = useState<boolean>(false);

  const dealNewTiles = () => {
    const newTiles = drawTiles(numberOfTiles);
    setSelectedTiles(newTiles);
  };

  useEffect(() => {
    // Delay to finish render of new tiles
    setLoadingResult(true);
    const timer = setTimeout(() => {
      setValidWords(getValidWordsFromTiles(selectedTiles));
      setLoadingResult(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedTiles]);

  return (
    <ScrabbleProviderContext.Provider
      value={{
        dealNewTiles,
        setNumberOfTiles,
        selectedTiles,
        numberOfTiles,
        loadingResult,
        validWords,
      }}
    >
      {children}
    </ScrabbleProviderContext.Provider>
  );
};
