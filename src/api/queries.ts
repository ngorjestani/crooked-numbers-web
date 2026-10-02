import { useQuery } from '@tanstack/react-query';
import {
  getTeam,
  getTeamRoster,
  getTeamSchedule,
  getTeamStats,
  getTeams,
} from './teams';

export const teamKeys = {
  all: ['teams'] as const,
  detail: (teamId: number) => ['teams', teamId] as const,
  roster: (teamId: number) => ['teams', teamId, 'roster'] as const,
  stats: (teamId: number) => ['teams', teamId, 'stats'] as const,
  schedule: (teamId: number) => ['teams', teamId, 'schedule'] as const,
};

export function useTeams() {
  return useQuery({
    queryKey: teamKeys.all,
    queryFn: ({ signal }) => getTeams(signal),
    staleTime: 30 * 60 * 1000,
  });
}

export function useTeam(teamId: number) {
  return useQuery({
    queryKey: teamKeys.detail(teamId),
    queryFn: ({ signal }) => getTeam(teamId, signal),
    enabled: Number.isInteger(teamId) && teamId > 0,
    staleTime: 15 * 60 * 1000,
  });
}

export function useTeamRoster(teamId: number) {
  return useQuery({
    queryKey: teamKeys.roster(teamId),
    queryFn: ({ signal }) => getTeamRoster(teamId, signal),
    enabled: Number.isInteger(teamId) && teamId > 0,
    staleTime: 10 * 60 * 1000,
  });
}

export function useTeamStats(teamId: number) {
  return useQuery({
    queryKey: teamKeys.stats(teamId),
    queryFn: ({ signal }) => getTeamStats(teamId, signal),
    enabled: Number.isInteger(teamId) && teamId > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTeamSchedule(teamId: number) {
  return useQuery({
    queryKey: teamKeys.schedule(teamId),
    queryFn: ({ signal }) => getTeamSchedule(teamId, signal),
    enabled: Number.isInteger(teamId) && teamId > 0,
    staleTime: 2 * 60 * 1000,
  });
}
