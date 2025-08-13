export interface TimeSlotRequest {
  date: string;
  startTime: string;
  endTime: string;
}

export interface NewMatchRequest {
  teamId: number;
  roofed: number;
  wallMaterialId: number;
  floorMaterialId: number;
  timeSlots: TimeSlotRequest[];
}

export interface PlayerCategory {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  category?: PlayerCategory;
}

export interface PlayersTeams {
  id: number;
  creator: number;
  playerId: number;
  teamId: number;
  player: Player;
}

export interface Team {
  id: number;
  name: string;
  PlayersTeams?: PlayersTeams[];
}

export interface MatchesTeams {
  id: number;
  isCreator: number;
  team: Team;
}

export interface Match {
  id: number;
  roofed: number;
  turnId: number;
  wallMaterialId: number;
  floorMaterialId: number;
  matchStateId: number;
  MatchesTeams: MatchesTeams[];
}
