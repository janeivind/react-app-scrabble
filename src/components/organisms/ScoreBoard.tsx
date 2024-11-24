import { Box, Grid, Table } from "@radix-ui/themes";
import { Word } from "../../utils/interfaces";
import { FC } from "react";
import TileBoard from './TileBoard';

interface Props {
  words: Array<Word>;
}

const ScoreBoard: FC<Props> = ({ words }) => {
  return (
    <Grid gap="3" className='mt-6 w-3/6' style={{ justifySelf: 'center'}}>
      <Box>
        <h2 className="text-2xl text-blue-400">Valid words and their score</h2>
      </Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Word</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell style={{ width: '20%'}}>Score</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {words.map((word) => {
            return (
              <Table.Row key={word.spelling}>
                <Table.Cell><TileBoard tiles={word.tiles} tileType='result'/></Table.Cell>
                <Table.Cell className="font-extrabold">{word.points}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Grid>
  );
};

export default ScoreBoard;
