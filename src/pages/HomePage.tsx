import { Container, Paper, Stack, Text, Title } from '@mantine/core';
import { TeamSelector } from '../features/teams/TeamSelector';

export function HomePage() {
  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md">
        <Stack gap="lg">
          <div>
            <Text c="blue" fw={700} size="sm" tt="uppercase">
              Start with a club
            </Text>
            <Title order={1}>Explore MLB teams</Title>
            <Text c="dimmed" mt="sm">
              View current rosters, season batting and pitching lines, and
              recent or upcoming games.
            </Text>
          </div>
          <TeamSelector />
        </Stack>
      </Paper>
    </Container>
  );
}
