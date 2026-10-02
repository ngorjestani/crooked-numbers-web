import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TeamPage } from './TeamPage';

function renderTeamPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/teams/147']}>
          <Routes>
            <Route path="/teams/:teamId" element={<TeamPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </MantineProvider>,
  );
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('TeamPage', () => {
  it('renders a loading state while requests are pending', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise<Response>(() => undefined)),
    );

    renderTeamPage();

    expect(screen.getAllByLabelText('Loading').length).toBeGreaterThan(0);
  });

  it('renders an API error state', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse({ detail: 'The baseball service is unavailable.' }, 502),
        ),
    );

    renderTeamPage();

    expect(
      await screen.findByText('The baseball service is unavailable.'),
    ).toBeInTheDocument();
  });

  it('renders a populated batting table', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL | Request) => {
        const url = input.toString();
        if (url.endsWith('/teams')) {
          return Promise.resolve(
            jsonResponse([
              { id: 147, name: 'New York Yankees', abbreviation: 'NYY' },
            ]),
          );
        }
        if (url.endsWith('/stats')) {
          return Promise.resolve(
            jsonResponse({
              batting: [
                {
                  playerId: 99,
                  playerName: 'Aaron Judge',
                  gamesPlayed: 10,
                  plateAppearances: 44,
                  atBats: 35,
                  runs: 9,
                  hits: 11,
                  doubles: 2,
                  triples: 0,
                  homeRuns: 4,
                  rbi: 10,
                  walks: 8,
                  strikeouts: 9,
                  stolenBases: 1,
                  battingAverage: '.314',
                  onBasePercentage: '.432',
                  sluggingPercentage: '.714',
                  ops: '1.146',
                },
              ],
              pitching: [],
            }),
          );
        }
        if (url.endsWith('/roster')) {
          return Promise.resolve(jsonResponse({ players: [] }));
        }
        if (url.endsWith('/schedule')) {
          return Promise.resolve(
            jsonResponse({
              startDate: '2026-09-17',
              endDate: '2026-10-15',
              games: [],
            }),
          );
        }
        return Promise.resolve(
          jsonResponse({
            id: 147,
            name: 'New York Yankees',
            abbreviation: 'NYY',
            teamName: 'Yankees',
            locationName: 'Bronx',
            division: 'American League East',
            venue: 'Yankee Stadium',
          }),
        );
      }),
    );

    renderTeamPage();
    expect(
      await screen.findByRole('heading', { name: 'New York Yankees' }),
    ).toBeVisible();

    fireEvent.click(screen.getByRole('tab', { name: 'Batting' }));

    expect(await screen.findByText('Aaron Judge')).toBeVisible();
    expect(screen.getByText('1.146')).toBeVisible();
  });
});
