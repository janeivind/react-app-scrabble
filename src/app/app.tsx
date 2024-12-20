import { TileBoard, Controls, ScoreBoard } from "components/organisms/index";
import exampleImage from "../assets/scrabble.png";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { useGameContext } from "components/ScrabbleProvider";

function App() {
  const { selectedTiles, validWords, loadingResult } = useGameContext();
  return (
    <main className="mx-auto px-20 xl:px-60 py-20">
      <header>
        <div className="grid grid-flow-row-dense grid-cols-3 ">
          <div className="col-span-2">
            <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-6 text-blue-400">
              Scrabble
            </h1>
            <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
              This is a game where players attempt to create words from a set of
              letter tiles. Different letters have different points allocated to
              them.
            </p>
          </div>
          <div>
            <img alt="Example layout of a scrabble game" src={exampleImage} />
          </div>
        </div>
      </header>
      <Flex
        gap="5"
        wrap="wrap"
        justify="center"
        direction="column"
        style={{ justifySelf: "center" }}
        className="2xl:w-3/4"
      >
        <Box style={{ justifyItems: "center" }}>
          <TileBoard tiles={selectedTiles} />
        </Box>
        <Controls />
        <ScoreBoard words={validWords} loading={loadingResult} />
      </Flex>
      <footer className="pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto text-center sm:text-right text-gray-400 font-bold">
        <a href="https://github.com/janeivind/react-app-scrabble">
          Jan Eivind Rognås @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
}

export default App;
