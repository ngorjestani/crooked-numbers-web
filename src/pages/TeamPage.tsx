import {
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import {
  useTeam,
  useTeamRoster,
  useTeamSchedule,
  useTeamStats,
} from '../api/queries';
import { QueryState } from '../components/QueryState';
import { BattingTable } from '../features/teams/BattingTable';
import { PitchingTable } from '../features/teams/PitchingTable';
import { RosterTable } from '../features/teams/RosterTable';
import { ScheduleList } from '../features/teams/ScheduleList';
import { TeamSelector } from '../features/teams/TeamSelector';

export function TeamPage() {
  const { teamId: routeTeamId } = useParams();
  const teamId = Number(routeTeamId);
  const validTeamId = Number.isInteger(teamId) && teamId > 0;
  const team = useTeam(teamId);
  const roster = useTeamRoster(teamId);
  const stats = useTeamStats(teamId);
  const schedule = useTeamSchedule(teamId);

  if (!validTeamId) {
    return (
      <Container size="xl">
        <QueryState
          isPending={false}
          error={new Error('Select a valid team to continue.')}
        >
          {null}
        </QueryState>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-end">
          <QueryState isPending={team.isPending} error={team.error}>
            <div>
              <Text c="blue" fw={700} size="sm">
                {team.data?.abbreviation}
              </Text>
              <Title order={1}>{team.data?.name}</Title>
              <Text c="dimmed">
                {[team.data?.division, team.data?.venue]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </div>
          </QueryState>
          <div className="team-switcher">
            <TeamSelector value={teamId} label="Switch team" />
          </div>
        </Group>

        <Tabs defaultValue="overview" keepMounted={false}>
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="roster">Roster</Tabs.Tab>
            <Tabs.Tab value="batting">Batting</Tabs.Tab>
            <Tabs.Tab value="pitching">Pitching</Tabs.Tab>
            <Tabs.Tab value="schedule">Schedule</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="lg">
            <QueryState isPending={team.isPending} error={team.error}>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <OverviewCard label="Club" value={team.data?.teamName} />
                <OverviewCard
                  label="Location"
                  value={team.data?.locationName}
                />
                <OverviewCard label="Ballpark" value={team.data?.venue} />
              </SimpleGrid>
            </QueryState>
          </Tabs.Panel>

          <Tabs.Panel value="roster" pt="lg">
            <QueryState
              isPending={roster.isPending}
              error={roster.error}
              isEmpty={roster.data?.players.length === 0}
              emptyMessage="No active-roster players were returned."
            >
              <RosterTable players={roster.data?.players ?? []} />
            </QueryState>
          </Tabs.Panel>

          <Tabs.Panel value="batting" pt="lg">
            <QueryState
              isPending={stats.isPending}
              error={stats.error}
              isEmpty={stats.data?.batting.length === 0}
              emptyMessage="No batting statistics are available for the current season."
            >
              <BattingTable players={stats.data?.batting ?? []} />
            </QueryState>
          </Tabs.Panel>

          <Tabs.Panel value="pitching" pt="lg">
            <QueryState
              isPending={stats.isPending}
              error={stats.error}
              isEmpty={stats.data?.pitching.length === 0}
              emptyMessage="No pitching statistics are available for the current season."
            >
              <PitchingTable players={stats.data?.pitching ?? []} />
            </QueryState>
          </Tabs.Panel>

          <Tabs.Panel value="schedule" pt="lg">
            <QueryState
              isPending={schedule.isPending}
              error={schedule.error}
              isEmpty={schedule.data?.games.length === 0}
              emptyMessage="No games fall within the current schedule window."
            >
              <ScheduleList
                games={schedule.data?.games ?? []}
                teamId={teamId}
              />
            </QueryState>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

interface OverviewCardProps {
  label: string;
  value?: string | null;
}

function OverviewCard({ label, value }: OverviewCardProps) {
  return (
    <Card withBorder>
      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
        {label}
      </Text>
      <Text fw={600} mt={4}>
        {value ?? '—'}
      </Text>
    </Card>
  );
}
