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
