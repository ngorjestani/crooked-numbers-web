export interface TeamSummary {
  id: number;
  name: string;
  abbreviation: string;
}

export interface TeamDetails extends TeamSummary {
  teamName: string | null;
  locationName: string | null;
  division: string | null;
  venue: string | null;
}

export interface PlayerSummary {
  playerId: number;
  fullName: string;
  jerseyNumber: string | null;
  position: string;
  positionAbbreviation: string;
}

export interface TeamRosterResponse {
  players: PlayerSummary[];
}

export interface PlayerBattingStats {
  playerId: number;
  playerName: string;
  gamesPlayed: number;
  plateAppearances: number;
  atBats: number;
  runs: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  rbi: number;
  walks: number;
  strikeouts: number;
  stolenBases: number;
  battingAverage: string;
  onBasePercentage: string;
  sluggingPercentage: string;
  ops: string;
}

export interface PlayerPitchingStats {
  playerId: number;
  playerName: string;
  games: number;
  gamesStarted: number;
  inningsPitched: string;
  wins: number;
  losses: number;
  era: string;
  whip: string;
  strikeouts: number;
  walks: number;
  hits: number;
  homeRuns: number;
}

export interface TeamStatsResponse {
  batting: PlayerBattingStats[];
  pitching: PlayerPitchingStats[];
}

export interface ScheduleTeam {
  id: number;
  name: string;
}

export interface ScheduledGame {
  gamePk: number;
  gameDate: string;
  status: string;
  detailedStatus: string;
  awayTeam: ScheduleTeam;
  homeTeam: ScheduleTeam;
  awayScore: number | null;
  homeScore: number | null;
  venue: string | null;
}

export interface TeamScheduleResponse {
  startDate: string;
  endDate: string;
  games: ScheduledGame[];
}

export interface ApiProblem {
  status?: number;
  title?: string;
  detail?: string;
}
