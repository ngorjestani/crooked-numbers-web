import { Table, Text } from '@mantine/core';
import type { PlayerBattingStats } from '../../api/types';

interface BattingTableProps {
  players: PlayerBattingStats[];
}

const numericStyle = {
  textAlign: 'right' as const,
  fontVariantNumeric: 'tabular-nums',
};

export function BattingTable({ players }: BattingTableProps) {
  return (
    <Table.ScrollContainer minWidth={1100}>
      <Table striped highlightOnHover stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Player</Table.Th>
            {[
              'G',
              'PA',
              'AB',
              'R',
              'H',
              '2B',
              '3B',
              'HR',
              'RBI',
              'BB',
              'SO',
              'SB',
              'AVG',
              'OBP',
              'SLG',
              'OPS',
            ].map((column) => (
              <Table.Th key={column} style={numericStyle}>
                {column}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {players.map((player) => (
            <Table.Tr key={player.playerId}>
              <Table.Td>
                <Text fw={600} miw={150}>
                  {player.playerName}
                </Text>
              </Table.Td>
              {[
                player.gamesPlayed,
                player.plateAppearances,
                player.atBats,
                player.runs,
                player.hits,
                player.doubles,
                player.triples,
                player.homeRuns,
                player.rbi,
                player.walks,
                player.strikeouts,
                player.stolenBases,
                player.battingAverage,
                player.onBasePercentage,
                player.sluggingPercentage,
                player.ops,
              ].map((value, index) => (
                <Table.Td key={index} style={numericStyle}>
                  {value}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
