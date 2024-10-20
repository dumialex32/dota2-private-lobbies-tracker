import mongoose, { Document } from "mongoose";

export interface PlayerSchema extends Document {
  steamId: string;
  playerName: string;
  totalGames: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  totalNetworth: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgNetworth: number;
}

export type ExistingPlayerMap = {
  [steamId: string]: PlayerSchema;
};

const playerModel = new mongoose.Schema<PlayerSchema>({
  steamId: { type: String, required: true, unique: true },
  playerName: { type: String, required: true },
  totalGames: { type: Number, required: true },
  totalKills: { type: Number, required: true },
  totalDeaths: { type: Number, required: true },
  totalAssists: { type: Number, required: true },
  totalNetworth: { type: Number, required: true },
  avgKills: { type: Number, required: true },
  avgDeaths: { type: Number, required: true },
  avgAssists: { type: Number, required: true },
  avgNetworth: { type: Number, required: true },
});

const Player = mongoose.model("Player", playerModel);

export default Player;
