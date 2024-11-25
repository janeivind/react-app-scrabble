import { Box, Grid, Progress, Table } from "@radix-ui/themes";
import { Word } from "../../utils/interfaces";
import { FC, Fragment } from "react";
import TileBoard from "../molecules/TileBoard";

interface Props {
  words: Array<Word>;
  loading?: boolean;
}

const ScoreBoard: FC<Props> = ({ words, loading = false }) => {
  return (
    <Fragment>
      <Grid gap="3" className="mt-6 w-3/6" style={{ justifySelf: "center" }}>
        <Box>
          <h2 className="text-2xl text-blue-400">
            Valid words and their score
          </h2>
        </Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Word</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: "20%" }}>
                Score
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {words.map((word, index) => {
              return (
                <Fragment key={`${index}-${word.spelling}`}>
                  {loading && index === 0 && (
                    <Table.Row style={{ verticalAlign: "middle" }}>
                      <Table.Cell colSpan={2}>
                        <Progress radius="small" variant="soft" duration='1s' />
                      </Table.Cell>
                    </Table.Row>
                  )}
                  <Table.Row
                    style={{ verticalAlign: "baseline" }}
                  >
                    <Table.Cell>
                      {!loading && (
                        <TileBoard tiles={word.tiles} tileType="result" />
                      )}
                    </Table.Cell>
                    <Table.Cell className="font-extrabold">
                      {!loading ? word.points : ""}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}
            {words.length < 1 && (
              <Table.Row style={{ verticalAlign: "middle" }}>
                <Table.Cell colSpan={2}>
                  No possible matches from the dictionary!
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Grid>
    </Fragment>
  );
};

export default ScoreBoard;
