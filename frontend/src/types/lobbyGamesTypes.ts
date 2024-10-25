export interface PlayerInfo {
  steamId: string;
  playerName: string;
  heroName: string;
  gameTeam: number;
  kills: number;
  deaths: number;
  assists: number;
  networth: number;
  lastHits: number;
  denies: number;
  level: number;
  _id: string;
}

export interface LobbyGames {
  createdAt: string;
  _id: string;
  matchId: string;
  gameWinner: string;
  playerInfo: PlayerInfo[];
}
