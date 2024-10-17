import mongoose, { Document } from "mongoose";

interface PlayerStatsSchema extends Document {
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
}

interface LobbyGameSchema extends Document {
  matchId: string;
  gameWinner: string;
  playerInfo: PlayerStatsSchema[];
  timeStamps: Date;
}

const playerStatsSchema = new mongoose.Schema<PlayerStatsSchema>({
  steamId: { type: String },
  playerName: { type: String },
  heroName: { type: String },
  gameTeam: { type: Number },
  kills: { type: Number },
  deaths: { type: Number },
  assists: { type: Number },
  networth: { type: Number },
  lastHits: { type: Number },
  denies: { type: Number },
  level: { type: Number },
});

const lobbyGameSchema = new mongoose.Schema<LobbyGameSchema>(
  {
    matchId: { type: String, required: true, unique: true },
    gameWinner: { type: String, required: true }, // 2 = radiant, 3 = dire
    playerInfo: [playerStatsSchema],
  },
  { timestamps: true }
);

const LobbyGame = mongoose.model("LobbyGame", lobbyGameSchema);

export default LobbyGame;
