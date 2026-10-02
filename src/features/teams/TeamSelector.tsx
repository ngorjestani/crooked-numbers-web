import { Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTeams } from '../../api/queries';

interface TeamSelectorProps {
  value?: number;
  label?: string;
}

export function TeamSelector({
  value,
  label = 'Choose a team',
}: TeamSelectorProps) {
  const navigate = useNavigate();
  const teams = useTeams();

  return (
    <Select
      label={label}
      placeholder={teams.isPending ? 'Loading teams…' : 'Select an MLB team'}
      searchable
      clearable={false}
      disabled={teams.isPending || teams.isError}
      error={teams.error?.message}
      value={value?.toString() ?? null}
      data={(teams.data ?? []).map((team) => ({
        value: team.id.toString(),
        label: `${team.name} (${team.abbreviation})`,
      }))}
      onChange={(teamId) => teamId && navigate(`/teams/${teamId}`)}
    />
  );
}
