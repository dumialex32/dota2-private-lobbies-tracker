import { AnyBulkWriteOperation } from "mongoose";
import { ExistingPlayerMap, PlayerSchema } from "../models/PlayerModel";
import {
  ParsedRawMatchendData,
  ParsedRawMatchInfoData,
} from "../types/parsedRawDataTypes";

export const createUpdatePlayer = (
  matchInfo: ParsedRawMatchInfoData,
  matchendInfo: ParsedRawMatchendData,
  existingPlayerMap: ExistingPlayerMap,
  bulkOps: AnyBulkWriteOperation<PlayerSchema>[]
) => {
  for (const info of matchInfo.player_info) {
    const { player_name, steamid } = info;

    const playerStats = matchendInfo.players.find(
      (player) => player.steamid === steamid
    );

    if (!playerStats) {
      console.warn(`No player stats found for Player with steamid: ${steamid}`);
      continue; // continue with the next player
    }

    const existingPlayer = existingPlayerMap[steamid]; // Use the map to find existing player

    // calculate new stats
    const totalGames = existingPlayer ? existingPlayer.totalGames + 1 : 1;
    const totalKills = existingPlayer
      ? existingPlayer.totalKills + playerStats.kills
      : playerStats.kills;
    const totalDeaths = existingPlayer
      ? existingPlayer.totalDeaths + playerStats.deaths
      : playerStats.deaths;
    const totalAssists = existingPlayer
      ? existingPlayer.totalAssists + playerStats.assists
      : playerStats.assists;
    const totalNetworth = existingPlayer
      ? existingPlayer.totalNetworth + playerStats.gold
      : playerStats.gold;

    // prepare stats update or create
    const updateStats = {
      playerName: player_name,
      totalGames: totalGames,
      totalKills: totalKills,
      totalDeaths: totalDeaths,
      totalAssists: totalAssists,
      totalNetworth: totalNetworth,
      avgKills: totalKills / totalGames,
      avgDeaths: totalDeaths / totalGames,
      avgAssists: totalAssists / totalGames,
      avgNetworth: totalNetworth / totalGames,
    };

    if (existingPlayer) {
      // [repare an update operation for the existing player
      bulkOps.push({
        updateOne: {
          filter: { steamId: steamid },
          update: { $set: updateStats },
        },
      });
    } else {
      // prepare an insert operation for the new player
      bulkOps.push({
        insertOne: {
          document: {
            steamId: steamid,
            ...updateStats,
          } as Omit<PlayerSchema, "_id">,
        },
      });
    }
  }
};
