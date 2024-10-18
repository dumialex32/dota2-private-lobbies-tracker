export interface PlayerInfo {
  hero_name: string;
  player_name: string;
  steamid: string;
  game_team: string;
}

export interface ParsedRawMatchInfoData {
  game_mode: string;
  game_winner: string;
  match_id: string;
  player_info: PlayerInfo[];
}

// parsedRawMatchendData type
interface PlayerStats {
  player_name: string;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
  last_hits: number;
  denies: number;
  steamid: string;
}

export interface ParsedRawMatchendData {
  players: PlayerStats[];
}
