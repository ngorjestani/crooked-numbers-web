import { Badge, Group, Paper, Stack, Text } from '@mantine/core';
import type { ScheduledGame } from '../../api/types';

interface ScheduleListProps {
  games: ScheduledGame[];
  teamId: number;
}

function gameResult(game: ScheduledGame): string {
  if (game.status === 'Final') {
    return `${game.awayScore ?? 0} – ${game.homeScore ?? 0}`;
  }

  if (game.status === 'Live') {
    return game.detailedStatus;
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(game.gameDate));
}

export function ScheduleList({ games, teamId }: ScheduleListProps) {
  return (
    <Stack gap="sm">
      {games.map((game) => {
        const isHome = game.homeTeam.id === teamId;
        const opponent = isHome ? game.awayTeam : game.homeTeam;
        const badgeColor =
          game.status === 'Final'
            ? 'gray'
            : game.status === 'Live'
              ? 'red'
              : 'blue';

        return (
          <Paper key={game.gamePk} withBorder p="md">
            <Group justify="space-between" align="center" wrap="nowrap">
              <div>
                <Text size="sm" c="dimmed">
                  {new Intl.DateTimeFormat(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  }).format(new Date(game.gameDate))}
                </Text>
                <Text fw={600}>
                  {isHome ? 'vs.' : 'at'} {opponent.name}
                </Text>
                {game.venue && (
                  <Text size="xs" c="dimmed">
                    {game.venue}
                  </Text>
                )}
              </div>
              <Stack align="flex-end" gap={4}>
                <Badge color={badgeColor} variant="light">
                  {game.detailedStatus}
                </Badge>
                <Text fw={700}>{gameResult(game)}</Text>
              </Stack>
            </Group>
          </Paper>
        );
      })}
    </Stack>
  );
}
