import { Table, Text } from '@mantine/core';
import type { PlayerPitchingStats } from '../../api/types';

interface PitchingTableProps {
  players: PlayerPitchingStats[];
}

const numericStyle = {
  textAlign: 'right' as const,
  fontVariantNumeric: 'tabular-nums',
};

export function PitchingTable({ players }: PitchingTableProps) {
  return (
    <Table.ScrollContainer minWidth={850}>
      <Table striped highlightOnHover stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Player</Table.Th>
            {[
              'G',
              'GS',
              'IP',
              'W',
              'L',
              'ERA',
              'WHIP',
              'K',
              'BB',
              'H',
              'HR',
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
                player.games,
                player.gamesStarted,
                player.inningsPitched,
                player.wins,
                player.losses,
                player.era,
                player.whip,
                player.strikeouts,
                player.walks,
                player.hits,
                player.homeRuns,
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
