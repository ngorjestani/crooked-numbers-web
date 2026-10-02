import { Table, Text } from '@mantine/core';
import type { PlayerSummary } from '../../api/types';

interface RosterTableProps {
  players: PlayerSummary[];
}

export function RosterTable({ players }: RosterTableProps) {
  return (
    <Table.ScrollContainer minWidth={560}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={80}>No.</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Position</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {players.map((player) => (
            <Table.Tr key={player.playerId}>
              <Table.Td>{player.jerseyNumber ?? '—'}</Table.Td>
              <Table.Td>
                <Text fw={600}>{player.fullName}</Text>
              </Table.Td>
              <Table.Td>
                {player.position} ({player.positionAbbreviation})
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
