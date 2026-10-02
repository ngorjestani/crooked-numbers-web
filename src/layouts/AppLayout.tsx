import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTeams } from '../api/queries';

export function AppLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const teams = useTeams();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header px="md">
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link to="/" className="brand-link">
            <Title order={2}>Crooked Numbers</Title>
          </Link>
          <Text c="dimmed" size="sm" visibleFrom="sm">
            Baseball, clearly measured.
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <AppShell.Section mb="xs">
          <Text fw={700} size="xs" c="dimmed" tt="uppercase" px="sm">
            MLB Teams
          </Text>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          {teams.isPending && (
            <Text c="dimmed" size="sm" p="sm">
              Loading teams…
            </Text>
          )}
          {teams.isError && (
            <Text c="red" size="sm" p="sm">
              Teams are unavailable.
            </Text>
          )}
          {(teams.data ?? []).map((team) => (
            <NavLink
              key={team.id}
              component={Link}
              to={`/teams/${team.id}`}
              label={team.name}
              description={team.abbreviation}
              active={location.pathname === `/teams/${team.id}`}
              onClick={close}
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
