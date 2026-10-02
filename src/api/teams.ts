import { getJson } from './client';
import type {
  TeamDetails,
  TeamRosterResponse,
  TeamScheduleResponse,
  TeamStatsResponse,
  TeamSummary,
} from './types';

export const getTeams = (signal?: AbortSignal) =>
  getJson<TeamSummary[]>('/teams', signal);

export const getTeam = (teamId: number, signal?: AbortSignal) =>
  getJson<TeamDetails>(`/teams/${teamId}`, signal);

export const getTeamRoster = (teamId: number, signal?: AbortSignal) =>
  getJson<TeamRosterResponse>(`/teams/${teamId}/roster`, signal);

export const getTeamStats = (teamId: number, signal?: AbortSignal) =>
  getJson<TeamStatsResponse>(`/teams/${teamId}/stats`, signal);

export const getTeamSchedule = (teamId: number, signal?: AbortSignal) =>
  getJson<TeamScheduleResponse>(`/teams/${teamId}/schedule`, signal);
