import { getJson } from './client';

describe('getJson', () => {
  it('returns typed JSON for a successful response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 147, name: 'New York Yankees' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await getJson<{ id: number; name: string }>('/teams/147');

    expect(result.name).toBe('New York Yankees');
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/teams/147',
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    );
  });

  it('uses Problem Details when the response fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: 'Team not found.' }), {
          status: 404,
          headers: { 'Content-Type': 'application/problem+json' },
        }),
      ),
    );

    await expect(getJson('/teams/9999')).rejects.toMatchObject({
      message: 'Team not found.',
      status: 404,
    });
  });
});
